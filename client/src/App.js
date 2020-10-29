import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import Header from "./components/layouts/Header"
import Sensors from "./components/pages/Sensors"
import UserContext from "./context/UserContext"
import axios from "axios"

const App = () => {

    const [userData,setUserData]= useState({
        token: undefined,
        user: undefined,
        sensors: undefined
    })

    useEffect(()=>{
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token')

            if(token === null) {
                localStorage.setItem('auth-token', '')
                token = ''
            }
            const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {'x-auth-token': token}})
           
            if(tokenResponse.data) {

                try{
                    const userResponse = await axios.get('http://localhost:5000/users/',null,{headers:{'x-auth-token': token}})
          
                    setUserData({
                        token,
                        user: userResponse.data,
                    })
                }catch(err){
                    console.log(err.message)
                }
            }


        }

        checkLoggedIn()
        
    }, []);
    return (
        <>
            <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <Header />
                <div className="container">

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/sensors" component={Sensors} />
                </Switch>
                </div>
            </UserContext.Provider>
            </BrowserRouter>
        </>
    );
};

export default App;