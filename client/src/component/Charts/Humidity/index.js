import { LineChart } from "@mui/x-charts/LineChart";

function Humidity() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LineChart
          grid={{ vertical: true, horizontal: true }}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [40, 50, 70, 55, 53, 65],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  );
}

export default Humidity;
