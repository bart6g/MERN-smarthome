# MERN-smarthome

This is one of my projects I did my studies. It's written with MERN stack. 

## Front-end
The front of the application was written in React technology. The core of the application is the App component which renders the appropriate components depending on the route on which the user is located. UserContext was created which to simplify the transfer of data / functions between child components. The Register component is responsible for the registration page, and the Login component is responsible for logging in. The AddSensor component supports the route responsible for adding a new sensor, MySensors for displaying sensors, SensorData for displaying the relevant sensor data. All inputs, buttons etc. have been imported from the MaterialUI library. React-router-dom was used to change the paths, while CanvasJs was used to create the charts. All requests are sent to the server via the Axios library.

## Back-end
The server was written in Express.js. The Mongoose library was used to handle database requests. JWT was used for authentication. The server is equipped with two Routers - userRouter (responsible for handling queries related directly to the user) and userSensorRouter, responsible for handling requests related to sensors, as well as obtaining data generated on the RPI. There are five models of data structures in the server application:
User,
Sensor,
Temperature,
DogFood,
Humidity.
The sensor belongs to the User, while Temperature, DogFood, Humidity, respectively, belongs to the Sensor. The data generator at a specific time step downloads all sensors from the database and generates random data for them from a given range of values.
 
## Database
The project uses the MongoDB database.

## DATA
Originally this application was connected to Python Application (with MQTT protocol). That application was storing random data about the sensors to database, every fifteen seconds. It wasn't written by the author and that's why it's not in this repository.
