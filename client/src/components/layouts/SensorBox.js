import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

const SensorBox = ({ name, value, id }) => {
  const { userData, setUserData, fetchData } = useContext(UserContext);

  const { token, user } = userData;

  const handleDelete = async (user, token, id) => {
    const deleteResponse = await await axios({
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
    console.log("user");
    console.log(user);
    console.log("user id");
    console.log(user.id);
    console.log("delete respone");
    console.log(deleteResponse);
    //pobieranie nowych danych i aktualizacja stanu
    fetchData(user, token, user.id);
  };
  return (
    <div className="sensor-box" key={id}>
      <h1>{name}</h1>
      <p>Wartość: {value}</p>

      <div className="btns">
        <button onClick={() => handleDelete(user, token, id)}>Usuń</button>
        <button>Edytuj</button>
      </div>
    </div>
  );
};

export default SensorBox;
