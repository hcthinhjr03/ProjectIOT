import { LineChart } from "@mui/x-charts/LineChart";

function Brightness() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LineChart
          grid={{ vertical: true, horizontal: true }}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [340, 350, 470, 555, 653, 465],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </>
  );
}

export default Brightness;
