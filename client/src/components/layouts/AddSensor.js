import React, {useContext, useState} from 'react';
import UserContext from "../../context/UserContext";
import axios from "axios"

const AddSensor = ({setOpened}) => {

    const {userData,setUserData, fetchData} = useContext(UserContext);
    const {token,user} = userData;
    const {id} = user;

    //new Sensor properties

    const [name, setName] = useState('');
    const [value,setValue] = useState('')


    const handleClose = () => {
        setOpened(false)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSensor = {
            userId: id,
            name,
            value
        }

        const sensorResponse =  await axios.post("http://localhost:5000/sensor/add", newSensor, {headers:{'x-auth-token': localStorage.getItem('auth-token')}});

        fetchData(user,token,id)
        
        console.log('works')
        console.log(sensorResponse)
    }

    return (
        <div className="sensor-form">
            <button onClick={handleClose}>X</button>
            <button onClick={()=>console.log(id)}>user</button>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="login-email">Sensor Name</label>
                <input
                id="login-email"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="login-email">Sensor Initial Value</label>
                <input
                id="login-email"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />

                <input type="submit" value="Submit"/>
            </form>
            
        </div>
    );
};

export default AddSensor;