'use client';
import {useState} from 'react';
import useStrapi from "../../../hooks/useStrapi"
import React from 'react';
import { useLogGood } from '../../../components/LogGoodContext';
import LoginInputs from '../../../components/LoginInputs';
import { useUserContext } from '../../../components/UserContext';
import { useRouter } from 'next/navigation';
import { useJwtContext } from '../../../components/JwtContext';
import {Paper} from '@mui/material'


export default function LoginPage(){

    const [activePass, setActivePass] = useState("");
    const {fetchAPI} = useStrapi();
    const { logGood, setLogGood} = useLogGood();
    const [activeUser1, setActiveUser1] = useState('');
    const {setActiveUser} = useUserContext();
    const {jwt,setJwt} = useJwtContext();
    const router = useRouter();
    

    const handleInputChange1 = (e) =>{
        setActiveUser1(e.target.value);
    };
    const handleInputChange2 = (e) =>{
        setActivePass(e.target.value);
    };

    const handleLogin = async () => {
        // Here you can perform any login logic using the 'username' state
        console.log('Submitted username: '+ activeUser1+  
        ' password: '+ activePass);

        const loginData = {
            "identifier": activeUser1,
            "password": activePass
        };

        try{
            const response = await fetchAPI('/api/auth/local',
            {
                method:'POST',
                data: loginData
            });
            if(response.status===200){
                setLogGood(true);
                setActiveUser(activeUser1)
                const userToken = response.data.jwt
                console.log('login succesful. JWT: ' + userToken);
                setJwt(userToken);
            }
            else{
                console.log('login failed!')
                setLogGood(false);
            }

        }
        catch(error){
            console.log(error);
        }
      };


      const FinishLogin = ()=>{
        const text = 'Login successful'
        router.push('/coffeereviews')
        return(
            <div>
                <h2>{text}</h2>
                <button onClick={logOut}>Logout</button>
            </div>
        )
      }

      function logOut(){
        console.log("Performing logout.")
        setLogGood(false);
        setActiveUser("");
        setJwt("empty")
      }


    console.log("Value of logGood:" + logGood);
    console.log("Token: " + jwt);

    return(
        // <div className="loginPage">
        <div style={{display:"flex",justifyContent:"end", marginRight:"40px"}}>
            <Paper 
        sx={{backgroundColor:"#967259",height:"600px",borderRadius:10, marginTop:6, width:"25%",
         background:"linear-gradient(rgb(163, 138, 105,.85),rgba(56, 41, 29, 0.95))",boxShadow: '0px 0px 15px 5px #dbc1ac', border: '1px .55 #ece0d1',
         textAlign:"center"}}>
            <h2>Welcome to login page</h2>
            <p>Login Credentials are case sensitive!</p>
                {!logGood && (
        <LoginInputs
          activeUser={activeUser1}
          activePass={activePass}
          handleInputChange1={handleInputChange1}
          handleInputChange2={handleInputChange2}
          handleLogin={handleLogin}
        />
      )}
                {logGood && <FinishLogin/>}
                </Paper>
        </div>
    )
}