import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

const AddSensor = ({ setOpened }) => {
  const { userData, setUserData, fetchData } = useContext(UserContext);
  const { token, user } = userData;
  const { id } = user;

  //new Sensor properties

  const [name, setName] = useState("");
  const [topic, setTopic] = useState("temperature");

  const handleClose = () => {
    setOpened(false);
  };

  const handleTopic = (e) => {
    setTopic(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSensor = {
      userId: id,
      name,
      topic
    };

    const sensorResponse = await axios.post(
      "http://localhost:5000/sensor/add",
      newSensor,
      { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
    );

    fetchData(user, token, id);

    console.log("works");
    console.log(sensorResponse);
  };

  return (
    <div className="sensor-form">
      <button onClick={handleClose}>X</button>
      <button onClick={() => console.log(id)}>user</button>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Sensor Name</label>
        <input
          id="login-email"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select name="topic" id="topic" onChange={(e)=>handleTopic(e)}>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="dogfood">Dog Food</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddSensor;
