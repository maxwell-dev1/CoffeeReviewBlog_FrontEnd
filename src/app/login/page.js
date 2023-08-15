'use client';
import {useState} from 'react';
import useStrapi from "../../../hooks/useStrapi"
import React from 'react';
import { useLogGood } from '../../../components/LogGoodContext';
import LoginInputs from '../../../components/LoginInputs';
import { useUserContext } from '../../../components/UserContext';
import { useRouter } from 'next/navigation';
import { useJwtContext } from '../../../components/JwtContext';


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
        <div className="loginPage">
            <p>Welcome to login page</p>
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
        </div>
    )
}