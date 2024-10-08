#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include "DHT.h"
#include <ESP8266HTTPClient.h>


//light sensor
#define ldr_pin A0
#define ADC_value 0.0048828125


//replace with your network credentials
#define WIFI_SSID "NOTE 5"
#define WIFI_PASSWORD "11121314"

//Mosquitto MQTT Broker
#define MQTT_HOST IPAddress(192, 168, 1, 6)
#define MQTT_PORT 1893

//MQTT Topics
#define MQTT_PUB_DATA_SENSOR "esp8266/datasensor"
#define MQTT_PUB_BULB_ACTION "esp8266/action/bulb"
#define MQTT_PUB_FAN_ACTION "esp8266/action/fan"
#define MQTT_PUB_AC_ACTION "esp8266/action/ac"

#define LED_BULB 5
#define LED_FAN 4
#define LED_AC 0


#define DHTPIN 14
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);



float temperature;
float humidity;

//light variables
int LDR_value;
int brightness;

AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;

WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

unsigned long previousMillis = 0;
const long interval = 2000;

void connectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to Wi-Fi.");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Disconnected from Wi-Fi.");
  mqttReconnectTimer.detach();
  wifiReconnectTimer.once(2, connectToWifi);
}

void connectToMqtt() {
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void onMqttConnect(bool sessionPresent) {
  Serial.println("Connected to MQTT.");
  Serial.print("Session present: ");
  mqttClient.subscribe("esp8266/action/bulb", 0);
  mqttClient.subscribe("esp8266/action/fan", 0);
  mqttClient.subscribe("esp8266/action/ac", 0);
  Serial.println(sessionPresent);
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

void onMqttPublish(uint16_t packetId) {
  Serial.print("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}


void setup() {
  Serial.begin(115200);
  Serial.println();

  dht.begin();

  pinMode(LED_BULB, OUTPUT);
  pinMode(LED_FAN, OUTPUT);
  pinMode(LED_AC, OUTPUT);

  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);


  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);

  mqttClient.onMessage([](char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t length, size_t totalLength, size_t offset) {
    String topicStr(topic);
    String message(payload);

    // Create a substring for the message payload
    message = message.substring(0, length);

    // Handle the message based on the topic
    if (topicStr == "esp8266/action/bulb") {
      if (message == "ON") {
        digitalWrite(LED_BULB, HIGH);
      } else if (message == "OFF") {
        digitalWrite(LED_BULB, LOW);
      }
    } else if (topicStr == "esp8266/action/fan") {
      if (message == "ON") {
        digitalWrite(LED_FAN, HIGH);
      } else if (message == "OFF") {
        digitalWrite(LED_FAN, LOW);
      }
    } else if (topicStr == "esp8266/action/ac") {
      if (message == "ON") {
        digitalWrite(LED_AC, HIGH);
      } else if (message == "OFF") {
        digitalWrite(LED_AC, LOW);
      }
    }
  });

  connectToWifi();
}

int conversion(int raw_val) {
  int lux = (250.000000 / (ADC_value * LDR_value)) - 50.000000;
  return lux;
}


void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    humidity = dht.readHumidity();
    temperature = dht.readTemperature();

    LDR_value = analogRead(ldr_pin);
    brightness = conversion(LDR_value);

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    if (isnan(brightness)) {
      Serial.println(F("Failed to read from Light sensor!"));
      return;
    }

    // Publish an MQTT message on topic esp8266/datasensor
    String dataSensor = "{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + ",\"brightness\":" + String(brightness) + "}";
    uint16_t packetIdPub4 = mqttClient.publish(MQTT_PUB_DATA_SENSOR, 1, true, String(dataSensor).c_str());
    Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", MQTT_PUB_DATA_SENSOR, packetIdPub4);
    Serial.printf("%s\n", dataSensor.c_str());


    // Send sensor data to the backend
    String url = "http://192.168.1.6:3006/data-sensor";
    WiFiClient client;
    HTTPClient http;

    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + ",\"brightness\":" + String(brightness) + "}";
    int httpCode = http.POST(payload);


    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Data sent successfully");
    } else {
      Serial.println(httpCode);
      Serial.println("Error sending data");
      Serial.println(http.getString());
    }
    http.end();
  }
}