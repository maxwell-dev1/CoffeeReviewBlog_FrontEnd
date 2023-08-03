'use client';
import {useState} from 'react';
import useStrapi from "../../../hooks/useStrapi"
import React from 'react';
import { useLogGood } from '../../../components/LogGoodContext';
import LoginInputs from '../../../components/LoginInputs';

export default function LoginPage(){

    const [activeUser, setActiveUser] = useState("");
    const [activePass, setActivePass] = useState("");
    const {fetchAPI} = useStrapi();
    const { logGood, setLogGood } = useLogGood();
    

    const handleInputChange1 = (e) =>{
        setActiveUser(e.target.value);
    };
    const handleInputChange2 = (e) =>{
        setActivePass(e.target.value);
    };

    const handleLogin = async () => {
        // Here you can perform any login logic using the 'username' state
        console.log('Submitted username: '+ activeUser+  
        ' password: '+ activePass);

        const loginData = {
            "identifier": activeUser,
            "password": activePass
        };

        try{
            const response = await fetchAPI('/api/auth/local',
            {
                method:'POST',
                data: loginData
            });
            if(response.status===200){
                console.log('login succesful');
                setLogGood(true);
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
      }

    //   const LoginInputs =()=>{
    //     return(
    //         <div>
    //             Enter username:
    //                 <input type='text' value={activeUser} onChange={handleInputChange1}/>
    //                 Enter password:
    //                 <input type='text' value={activePass} onChange={handleInputChange2} />
    //             <br></br>
    //             <button onClick={handleLogin} className='loginButton'>Login</button>
    //         </div>
    //     )
    //   }


    console.log("Value of logGood:" + logGood);

    return(
        <div className="loginPage">
            <p>Welcome to login page</p>
                {/* {!logGood && <LoginInputs/>} */}
                {!logGood && (
        <LoginInputs
          activeUser={activeUser}
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