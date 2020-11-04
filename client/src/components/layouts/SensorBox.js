import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

const SensorBox = ({ name, topic, id }) => {
  const { userData, setUserData, fetchData } = useContext(UserContext);

  const { token, user } = userData;

  const handleDelete = async (user, token, id) => {
    const deleteResponse = await axios({
      method: "post",
      url: "http://localhost:5000/sensor/delete",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "content-type": "application/json",
      },
      params: {
        id: id,
      },
    });
    //pobieranie nowych danych i aktualizacja stanu
    fetchData(user, token, user.id);
  };

  const handleData = async (topic, id) => {
    const dataResponse = await axios({
      method: "get",
      url: "http://localhost:5000/sensor/data",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "content-type": "application/json",
      },
      params: {
        topic: topic,
        sensorId: id,
      },
    });
    console.log(dataResponse);
  };

  return (
    <div className="sensor-box" key={id}>
      <h1>{name}</h1>
      <p>{topic}</p>

      <div className="btns">
        <button onClick={() => handleDelete(user, token, id)}>Usuń</button>
        <button onClick={() => handleData(topic, id)}>Show Data</button>
      </div>
    </div>
  );
};

export default SensorBox;
