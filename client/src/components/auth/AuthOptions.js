import React, {useState,useContext} from 'react';
import {useHistory} from "react-router-dom"
import UserContext from "../../context/UserContext"
import AddSensor from "../layouts/AddSensor"

const AuthOptions = () => {


    const {userData, setUserData} = useContext(UserContext);
    const [opened, setOpened] = useState(false);
    const history = useHistory();

    const handleOpen = () =>{
        setOpened(true)
    }

    const register = () =>{
        history.push('/register')
    }

    const login = () => {
        history.push('/login')
    }

    const logOut = () => {
        setUserData({
            token: undefined,
            user: undefined,
            sensors: undefined
        })
        localStorage.setItem('auth-token', '')
    }
    const showSensor = () =>{
        history.push('/sensors')
    }
    return (
        <div className="auth-options">
            {
                userData.user ? 
                <>
                <button onClick={()=>handleOpen()}>Add Sensor</button>
                <button onClick={showSensor}>My Sensors</button>
                <button onClick={logOut}>Log Out</button>
                {
                opened ? <AddSensor setOpened={setOpened}/> : null
                }
                </> : (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>)
            }

           
            
        </div>
    );
};

export default AuthOptions;