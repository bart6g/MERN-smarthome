const auth = require("../middlewares/auth");
const Sensor = require("../models/Sensor");
const Humidity = require("../models/Humidity");
const Temperature = require("../models/Temperature");
const DogFood = require("../models/DogFood");
const router = require("express").Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);
    const sensors = await Sensor.find({ userId: userId });
    const dogs = await DogFood.find({});
    console.log(dogs);
    res.json(sensors);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/delete", auth, async (req, res) => {
  const id = req.query.id;
  await Sensor.findByIdAndDelete(id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

router.post("/add", auth, async (req, res) => {
  try {
    const { userId, name, topic } = req.body;
    if (!name || !topic) {
      return res.json({ msg: "Not all fields are entered" });
    }
    const newSensor = new Sensor({
      userId,
      name,
      topic,
    });
    const savedSensor = await newSensor.save();
    res.json(savedSensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/data", auth, async (req, res) => {
  try {
    console.log("im here");
    const sensorId = req.query.sensorId;
    const topic = req.query.topic;
    console.log(topic);
    console.log(sensorId);
    if (!sensorId) {
      res.json("no id enetered");
    }
    if (!topic) {
      res.json("no topic entered");
    }
    if (topic === "humidity") {
      const humData = await Humidity.find({});
      console.log(humData);
      res.json(humData);
    } else if (topic === "temperature") {
      const tempData = await Temperature.find({ sensorId: sensorId });
      console.log(tempData);
      res.json(tempData);
    } else if (topic === "dogfood") {
      const dogData = await DogFood.find({ sensorId: sensorId });
      console.log(dogData);
      res.json(dogData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
