import { LineChart } from "@mui/x-charts/LineChart";

function Temperature() {
  return (
    <>
      <div style={{display: "flex", justifyContent: "center"}}>
      <LineChart
        grid={{ vertical: true, horizontal: true }}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [25, 27, 36, 32, 29, 38],
          },
        ]}
        width={500}
        height={300}
      />
      </div>
    </>
  );
}

export default Temperature;
