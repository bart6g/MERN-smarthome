import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const SensorData = () => {
  const { userData, setUserData, fetchData } = useContext(UserContext);

  const { sensorData } = userData;

  return (
    <div>
      <button onClick={() => console.log(sensorData)}>click</button>
    </div>
  );
};

export default SensorData;
