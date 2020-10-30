import React, {useContext, useEffect} from 'react';
import UserContext from "../../context/UserContext"
import axios from "axios"

const Sensors = () => {
    const {userData, setUserData} = useContext(UserContext)
    const {token,user,sensors} = userData

   

    
    
    const fetchData = async()=>{
        // console.log(token)
        // console.log(user.id)
        try{
        //   const sensorResponse = axios.get('http://localhost:5000/sensor/',null,{headers:{
        //       'x-auth-token': token, 
        //       Accept: "application/json"
        //     }});

        let data = {
            params: {
                userId:user.id
            },
            headers: {
                "X-Auth-Token": localStorage.getItem('auth-token'),
                "content-type": "application/json"
            }
        };
        const url = 'http://localhost:5000/sensor/';

        console.log(userData)
        } catch(err){
            console.log(err)
        }

    }
    return (
        <div>
            <button onClick={()=>fetchData()}>Click</button>
        </div>
    );
};

export default Sensors;