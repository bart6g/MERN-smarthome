import React, {useContext, useEffect} from 'react';
import UserContext from "../../context/UserContext"
import SensorBox from "../layouts/SensorBox"
import axios from "axios"

const Sensors = () => {
    const {userData, setUserData} = useContext(UserContext)
    const {token,user,sensors} = userData


    return (
        <div className="sensors-container">
            <button onClick={()=>console.log(sensors)}>sensors</button>
            {sensors!==undefined ?sensors.map(sensor=><SensorBox name={sensor.name} key={sensor._id} id={sensor._id} value={sensor.value}/>) : null }     
        </div>
    );
};

export default Sensors;