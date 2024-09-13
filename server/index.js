const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const DataSensors = require("./db/dataSensorModel");

//database connection
dbConnect();

//config
app.use(cors());
app.use(express.json());

//routes
// app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello from IOT-Project API!" });
});

app.post("/data-sensor", async (req, res) => {
  const { temperature, humidity, brightness } = req.body;

  // Create a new sensor data document
  try {
    const newDataSensor = await DataSensors.create({
      temperature,
      humidity,
      brightness,
    });
    if (!newDataSensor) {
      res.status(401).json({ message: "Error created sensor data" });
    }
    res.status(200).json({ message: "Sensor data created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

function parseDateString(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  // Tạo đối tượng Date từ các thành phần
  const date = new Date(year, month - 1, day + 1);
  return date.toISOString(); // Chuyển đổi thành ISO 8601
}

app.get("/data-sensor", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; // Số lượng bản ghi mỗi trang
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const searchText = req.query.searchText || "";
    const searchedColumn = req.query.searchedColumn || "";

    // Tạo điều kiện tìm kiếm
    const query = {};
    if (searchText && searchedColumn) {
      switch (searchedColumn) {
        case "temperature":
        case "humidity":
        case "brightness":
          // Nếu cột là số, chuyển đổi giá trị tìm kiếm thành số
          const numberSearchText = parseFloat(searchText);
          if (!isNaN(numberSearchText)) {
            query[searchedColumn] = numberSearchText;
          }
          break;
        case "time":
          const date = parseDateString(searchText);
          if (date) {
            // Tìm kiếm trong khoảng thời gian 1 ngày
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            query[searchedColumn] = {
              $gte: startOfDay.toISOString(),
              $lte: endOfDay.toISOString(),
            };
          }
          break;
        default:
          // Nếu cột không phải là số, áp dụng tìm kiếm bằng $regex
          query[searchedColumn] = { $regex: searchText, $options: "i" };
      }
    }

    const data = await DataSensors.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await DataSensors.countDocuments(query);

    res.json({
      data,
      totalCount,
      pageSize,
      page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3006, () => {
  console.log("server listening on port 3006");
});
