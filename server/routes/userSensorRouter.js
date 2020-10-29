const auth = require('../middlewares/auth')
const Sensor = require('../models/Sensor')
const router = require('express').Router();

router.post('/add',auth, async(req,res) => {
    try {
      const {userId, name, value} = req.body;
      if (!name || !value) {
          return res.json({msg: 'Not all fields are entered'})
      }
      const newSensor = new Sensor({
          userId,
          name,
          value
      })
      const savedSensor = await newSensor.save()
      res.json(savedSensor)
  
    }  catch(err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.get('/all', auth, async (req,res)=>{
    const {userId} = req.body;
    console.log(userId)
    const sensors = await Sensor.find({userId: userId})
    res.json(sensors)
  })


  module.exports = router