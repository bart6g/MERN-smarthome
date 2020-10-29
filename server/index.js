const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const userSensorRouter = require('./routes/userSensorRouter')
require('dotenv').config();

//set up express
const app = express();

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000

//set up mongoose 

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log('Mongodb connection established successfully')
})

app.use('/users', userRouter)
app.use('/sensor', userSensorRouter)

app.get('/', (req, res) => {
    res.send('hello')
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})