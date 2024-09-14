const mongoose = require("mongoose");

const actionHistorySchema = new mongoose.Schema({
    device: String,
    action: String,
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model.ActionHistory || mongoose.model("ActionHistory", actionHistorySchema);