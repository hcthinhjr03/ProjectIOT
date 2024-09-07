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


app.post('/data-sensor', async (req, res) => {
    const { temp, humid } = req.body;

    // Create a new sensor data document
    try {
        const newDataSensor = await DataSensors.create({ temp, humid });
        if (!newDataSensor){
            res.status(401).json({ message: "Error created sensor data" });
        }
        res.status(200).json({ message: 'Sensor data created successfully' });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});



app.listen(3006, () => {
  console.log("server listening on port 3006");
});