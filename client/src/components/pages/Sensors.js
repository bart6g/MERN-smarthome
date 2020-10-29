import React, {useContext, useEffect} from 'react';
import UserContext from "../../context/UserContext"
import axios from "axios"

const Sensors = () => {
    const {userData, setUserData} = useContext(UserContext)

   

    
    const fetchData = async()=>{
        
        const data = {userId:userData.user.id}
        try{
            const sensorResponse = await axios.get('http://localhost:5000/sensor/all',data,{headers:{'x-auth-token': userData.token},
       })
            console.log(sensorResponse)
        } catch(err){
            console.log(err.message)
        }

    }
    return (
        <div>
            <button onClick={fetchData}>Click</button>
        </div>
    );
};

export default Sensors;