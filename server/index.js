const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");


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


app.listen(3006, () => {
  console.log("server listening on port 3006");
});