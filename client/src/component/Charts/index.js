import { CChart } from "@coreui/react-chartjs";
import mqtt from "mqtt";
import { useCallback, useEffect, useState } from "react";



function Chart() {

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
    const client = mqtt.connect('mqtt://192.168.1.6:9001');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('esp8266/datasensor');
    });

    client.on('message', (topic, message) => {
      if (topic === 'esp8266/datasensor') {
        const newData = JSON.parse(message.toString());
        handleNewData(newData);
      }
    });

    client.on('error', (error) => {
      console.error('MQTT error:', error);
    });

    return () => {
      client.end();
    };
  }, [handleNewData]);

  return (
    <>
      <CChart
        type="line"
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          datasets: [
            {
              label: "Temperature",
              backgroundColor: "red",
              borderColor: "red",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#000",
              data: temperatureData,
            },
            {
              label: "Humidity",
              backgroundColor: "blue",
              borderColor: "blue",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: humidityData,
            },
            {
              label: "Brightness",
              backgroundColor: "green",
              borderColor: "green",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: brightnessData,
            },
          ],
        }}
        options={{
          animation: false,
          plugins: {
            legend: {
              labels: {
                color: "#000",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "#FF7F50",
              },
              ticks: {
                color: "#FF7F50",
              },
            },
            y: {
              grid: {
                color: "#FF7F50",
              },
              ticks: {
                color: "#FF7F50",
              },
            },
          },
        }}
        customTooltips={false}
      />
    </>
  );
}

export default Chart;
