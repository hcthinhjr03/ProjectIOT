import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import mqtt from 'mqtt';

const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [dataSensor, setDataSensor] = useState({});

  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [brightnessData, setBrightnessData] = useState([]);

  const handleNewData = useCallback((newData) => {
    const maxDataPoints = 10;

    setTemperatureData(prevTemperatureData => {
      const updatedTemperatureData = [...prevTemperatureData, newData.temperature];
      return updatedTemperatureData.slice(-maxDataPoints);
    });

    setHumidityData(prevHumidityData => {
      const updatedHumidityData = [...prevHumidityData, newData.humidity];
      return updatedHumidityData.slice(-maxDataPoints);
    });

    setBrightnessData(prevBrightnessData => {
      const updatedBrightnessData = [...prevBrightnessData, newData.brightness];
      return updatedBrightnessData.slice(-maxDataPoints);
    });
  }, []);

  useEffect(() => {
    const mqttClient = mqtt.connect('mqtt://192.168.1.6:9001');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('esp8266/datasensor');
      setConnected(true);
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'esp8266/datasensor') {
        const newData = JSON.parse(message.toString());
        setDataSensor(newData);
        handleNewData(newData);
      }
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error: ', err);
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from MQTT broker');
      setConnected(false);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [handleNewData]);

  return (
    <MqttContext.Provider value={{ client, connected , dataSensor, temperatureData, humidityData, brightnessData}}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqtt must be used within an MqttProvider');
  }
  return context;
};
