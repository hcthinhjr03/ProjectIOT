import { CChart } from "@coreui/react-chartjs";
import { useMqtt } from "../../context/MqttContext";

function Chart() {

  const { temperatureData, humidityData, brightnessData } = useMqtt(); 

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
