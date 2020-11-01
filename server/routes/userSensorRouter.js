const auth = require('../middlewares/auth')
const Sensor = require('../models/Sensor')
const router = require('express').Router();

router.get('/', auth, async (req,res)=>{
  const userId = req.query.userId;
  console.log(userId)
  const sensors = await Sensor.find({userId: userId})
  res.json(sensors)
})

router.post('/delete', auth, async(req,res)=>{
    const id = req.query.id;
    await Sensor.findByIdAndDelete(id, (err,data)=>{
      if(err) {
        console.log(err)
      } else{
        res.json(data)
      }
    })
})

router.post('/add', auth, async(req,res) => {
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



  module.exports = router