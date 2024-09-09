#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include "DHT.h"
#include <ESP8266HTTPClient.h>


//light sensor
#define ldr_pin A0
//#define VIN 3.3 //dien ap nguon
#define R 10000 //gia tri dien tro phan ap
#define ADC_value 0.0048828125

 
//replace with your network credentials
#define WIFI_SSID "NOTE 5"
#define WIFI_PASSWORD "11121314"

 // Raspberry Pi Mosquitto MQTT Broker
#define MQTT_HOST IPAddress(192, 168, 1, 6)
#define MQTT_PORT 1883

//MQTT Topics
#define MQTT_PUB_TEMP "esp8266/dht/temperature"
#define MQTT_PUB_HUM  "esp8266/dht/humidity"
#define MQTT_PUB_BRIGHT  "esp8266/dht/brightness"

#define DHTPIN 14 
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

float temp;
float hum;

//light variables
int LDR_value;
int illuminance;

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
  
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);
  

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  
  connectToWifi();
}

int conversion(int raw_val){
  // doi don vi
  //float Vout = float(raw_val) * (VIN / float(1023));// doi analog sang dien ap
  // RLDR = (R * (VIN - Vout))/Vout; // doi dien ap to dien tro
  //int lux = 500/(RLDR/1000); // doi dien tro sang lumen

  int lux = (250.000000/(ADC_value*LDR_value))-50.000000;

  return lux;
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    hum = dht.readHumidity();
    temp = dht.readTemperature();

    LDR_value = analogRead(ldr_pin);
    illuminance = conversion(LDR_value);

    Serial.println(illuminance);
    
    if (isnan(temp) || isnan(hum)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }  

    if (isnan(illuminance)) {
      Serial.println(F("Failed to read from Light sensor!"));
      return;
    }  
    
    // Publish an MQTT message on topic esp8266/dht/temperature
    uint16_t packetIdPub1 = mqttClient.publish(MQTT_PUB_TEMP, 1, true, String(temp).c_str());                            
    Serial.printf("Publishing on topic %s at QoS 1, packetId: %i", MQTT_PUB_TEMP, packetIdPub1);
    Serial.printf("Message: %.2f \n", temp);

    // Publish an MQTT message on topic esp8266/dht/humidity
    uint16_t packetIdPub2 = mqttClient.publish(MQTT_PUB_HUM, 1, true, String(hum).c_str());                            
    Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", MQTT_PUB_HUM, packetIdPub2);
    Serial.printf("Message: %.2f \n", hum);

    // Publish an MQTT message on topic esp8266/dht/brightness
    uint16_t packetIdPub3 = mqttClient.publish(MQTT_PUB_BRIGHT, 1, true, String(illuminance).c_str());                            
    Serial.printf("Publishing on topic %s at QoS 1, packetId %i: ", MQTT_PUB_BRIGHT, packetIdPub3);
    Serial.printf("Message: %d \n", illuminance);

    // Send sensor data to the backend
    String url = "http://192.168.1.6:3006/data-sensor"; 
    WiFiClient client;
    HTTPClient http;
    
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"temp\":" + String(temp) + ",\"humid\":" + String(hum) + "}";
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