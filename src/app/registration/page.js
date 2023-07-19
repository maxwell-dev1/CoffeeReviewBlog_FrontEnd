'use client';
import useStrapi from "../../../hooks/useStrapi"
import React from 'react';
//app router migration below we use /navigation instead of router
import { useRouter } from 'next/navigation'


export default function register(){

    const {fetchAPI} = useStrapi();
    const [regGood, setRegGood] = React.useState(false);
    //we make a router constant here for the useRouter to be simpler
    const router = useRouter();
    const [regClicked, setRegClicked] = React.useState(false);


    const handleRegistration = async () =>{
        const userToRegister = {
            "username": "dronald",
            "email": "dufus1asdf2343@gmail.com",
            "password": "Donkeys"
        }
        try{
            //here we pass two arguemtns to fetchAPI in useStrapi.js . the first one becomes the path variable, the second argument becomes 
            const res = await fetchAPI(`/api/auth/local/register`,{
                method: 'POST',
                data: userToRegister
            });

            debugger;
            if(res.status === 200 ){
                setRegGood(true)
            }
            else if (res.status === 400){
                setRegGood(false)
                

            }
        }

        catch(error){
            console.log(error)
        }
        //I put the set clicked here because it makes it so it doesnt render the failed reg message between the click and the contents of the try processing , which
        //was making the message appear even for succesful attempts to register
        setRegClicked(true);
    }

    //this is how we change pages using next JS 13 app router migration
    const changePages = () =>{
        router.push('/testpage1')
    }

    const FinishReg = () =>{
        const text = `Your registration was succesful. Please click the button below to proceed. `
        return (<div>
            <p id="regSuc">{text}</p>
            <button onClick={changePages}>Proceed</button>
            </div>)
    }

    const FailReg = () => {
        const text = 'Registration failed. You may have registered this account already.'
        return (<div>
            <p id='regFail'>{text}</p>
            <button onClick={changePages}>Continue</button>
            </div>)
    }


 

    return (
    <div>
    <h1>Welcome to registration page : </h1>
    <button onClick={handleRegistration}>Register User</button>
    {regGood && <FinishReg/>}
    {regClicked && !regGood && <FailReg/>}
    {/* <ConditionalComponent regGood={regGood} /> */}
    </div>);
}
