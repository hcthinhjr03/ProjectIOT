import { CChart } from "@coreui/react-chartjs";

function Chart() {
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
              data: [40, 35, 27, 25, 36, 34, 39, 42, 25, 33],
            },
            {
              label: "Humidity",
              backgroundColor: "blue",
              borderColor: "blue",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: [90, 78, 85, 69, 73, 87, 80, 77, 67, 75],
            },
            {
              label: "Brightness",
              backgroundColor: "green",
              borderColor: "green",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#000",
              data: [350, 312, 428, 329, 417, 325, 312, 470, 360, 333],
            },
          ],
        }}
        options={{
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
