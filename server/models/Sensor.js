const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: { type: String, required: true },
  value: { type: Object, required: true },
});

module.exports = Sensor = mongoose.model("sensor", sensorSchema);
