const mongoose = require("mongoose");

const dataSensorSchema = new mongoose.Schema({
    temp: Number,
    humid: Number,
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model.DataSensors || mongoose.model("DataSensors", dataSensorSchema);