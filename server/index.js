const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const DataSensors = require("./db/dataSensorModel");
const ActionHistory = require("./db/actionHistoryModel");

//database connection
dbConnect();

//config
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send({ message: "Hello from IOT-Project API!" });
});

//data-sensor routes

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


const reverseFormatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');

  const isoDate = new Date(`${year}-${month}-${day}`);

  return isoDate.toISOString();
};

app.get("/data-sensor", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; // Số lượng bản ghi mỗi trang
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const searchText = req.query.searchText || "";
    const searchedColumn = req.query.searchedColumn || "";
    const sortField = req.query.sortField || ""; 
    const sortOrder = req.query.sortOrder || ""; 

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
          const date = reverseFormatDate(searchText);
          if (date) {
            // Tìm kiếm trong khoảng thời gian 1 ngày
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            startOfDay.setTime(startOfDay.getTime() - 7 * 60 * 60 * 1000);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            endOfDay.setTime(endOfDay.getTime() - 7 * 60 * 60 * 1000);

            query[searchedColumn] = {
              $gte: startOfDay,
              $lte: endOfDay,
            };
          }
          break;
        default:
          // Nếu cột không phải là số, áp dụng tìm kiếm bằng $regex
          query[searchedColumn] = { $regex: searchText, $options: "i" };
      }
    }

    const sort = {};
    if (sortField) {
      sort[sortField] = sortOrder === "ascend" ? 1 : -1; 
    }

    sort.time = -1;

    const data = await DataSensors.find(query)
      .sort(sort)
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


//action-history routes
app.post("/action-history", async (req, res) => {
  const { device, action } = req.body;

  try {
    const newActionHistory = await ActionHistory.create({
      device,
      action
    });
    if (!newActionHistory) {
      res.status(401).json({ message: "Error created action history" });
    }
    res.status(200).json({ message: "Action history created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/action-history", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; // Số lượng bản ghi mỗi trang
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const searchText = req.query.searchText || "";
    const searchedColumn = req.query.searchedColumn || "";

    // Tạo điều kiện tìm kiếm
    const query = {};
    if (searchText && searchedColumn) {
      switch (searchedColumn) {
        case "time":
          const date = reverseFormatDate(searchText);
          if (date) {
            // Tìm kiếm trong khoảng thời gian 1 ngày
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            startOfDay.setTime(startOfDay.getTime() - 7 * 60 * 60 * 1000);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            endOfDay.setTime(endOfDay.getTime() - 7 * 60 * 60 * 1000);
            query[searchedColumn] = {
              $gte: startOfDay,
              $lte: endOfDay
            };
          }
          break;
        default:
          query[searchedColumn] = { $regex: searchText, $options: "i" };
      }
    }

    const sort = {time: -1};

    const data = await ActionHistory.find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await ActionHistory.countDocuments(query);

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
