import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SensorBox = ({ name, topic, id }) => {
  const { userData, setUserData, fetchData, getDataForOneSensor } = useContext(
    UserContext
  );
  const history = useHistory();
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

  const showData = (userData, topic, id) => {
    getDataForOneSensor(topic, id, userData);
    history.push(`/sensors/${id}`);
  };

  return (
    <div className="sensor-box" key={id}>
      <h1>{name}</h1>
      <p>{topic}</p>

      <div className="btns">
        <button onClick={() => handleDelete(user, token, id)}>Usuń</button>
        <button onClick={() => showData(userData, topic, id)}>Show Data</button>
      </div>
    </div>
  );
};

export default SensorBox;
