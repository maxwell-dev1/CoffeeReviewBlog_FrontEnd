'use client';
import React from 'react';
//app router migration below we use /navigation instead of router
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import { Button, Paper, Typography } from "@mui/material";
import {api} from '../../../utils/api';

export default function register(){

    const [regGood, setRegGood] = React.useState(true);
    //we make a router constant here for the useRouter to be simpler
    const router = useRouter();
    const [regClicked, setRegClicked] = React.useState(false);
    const [regUser, setRegUser] = useState('')
    const [regPass, setRegPass] = useState('')
    const [email, setEmail] = useState('')


    const handleRegistration = async () =>{
        const userToRegister = {
            "username": regUser,
            "email": email,
            "password": regPass
        }
        try{
            const res = await fetch(api.users, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToRegister)
            });

            if (res.ok) {
                setRegGood(true);
            } else {
                setRegGood(false);
            }
        }
        catch(error){
            console.log(error);
            setRegGood(false);
        }
        //I put the set clicked here because it makes it so it doesnt render the failed reg message between the click and the contents of the try processing , which
        //was making the message appear even for succesful attempts to register
        setRegClicked(true);
    }

    //this is how we change pages using next JS 13 app router migration
    const changePages = () =>{
        router.push('/coffeereviews')
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

    function handleRegUser(e){
        setRegUser(e.target.value)
    }
    function handleRegPass(e){
        setRegPass(e.target.value)
    }
    function handleEmail(e){
        setEmail(e.target.value)
    }

    console.log(regUser +  regPass)

 

    return (
        // The styling on this div simply places the registration panel in the center of the page.
    <div style={{justifyContent:"center", display:"flex"}}> 

        <Paper 
        sx={{backgroundColor:"#967259",height:"640px",borderRadius:10, marginTop:"px", width:"45%",
         background:"linear-gradient(rgb(163, 138, 105,.85),rgba(56, 41, 29, 0.95))",boxShadow: '0px 0px 15px 5px #dbc1ac', border: '1px .55 #ece0d1',
         textAlign:"center",marginBottom:'40px'}}>

            <Typography variant="h4" style={{ marginLeft:20, paddingTop:22,textAlign:"center", color:"#dbc1ac",textShadow: "0px 2px 4px rgba(0, 0, 0, .8)", }}>Welcome to registration page : </Typography>
            


            <Typography style={{marginLeft:8, marginTop:20, marginBottom:20,color:"#dbc1ac",textShadow: "0px 2px 4px rgba(0, 0, 0, .8)",fontFamily:"Lato, sans-serif"}}>Credentials are case sensitive!</Typography>
            
            {/* if the user hasnt clicked the register button yet display all the inputs so they can attempt to */}
            {!regClicked && 
            (<div>
            <Typography sx={{color:"#dbc1ac", fontSize:18, marginBottom:1,textShadow: "0px 2px 4px rgba(0, 0, 0, .8)",marginTop:'50px'}}>Email address</Typography>
            <input className="loginIn" value={email} onChange={handleEmail} style={{boxShadow:"0px 5px 10px -5px #000000", fontFamily:"Lato"}}></input>
            <Typography sx={{color:"#dbc1ac",fontSize:18, marginBottom:1,textShadow: "0px 2px 4px rgba(0, 0, 0, .8)"}}>New username</Typography>
            <input className="loginIn" type="text" value={regUser} onChange={handleRegUser} style={{boxShadow:"0px 5px 10px -5px #000000"}}></input>
            <Typography sx={{color:"#dbc1ac",fontSize:18, marginBottom:1,textShadow: "0px 2px 4px rgba(0, 0, 0, .8)"}}>Set password</Typography>
            <input className="loginIn" type="password" value={regPass} onChange={handleRegPass} style={{boxShadow:"0px 5px 10px -5px #000000"}}></input>

            <br></br>
            <Button onClick={handleRegistration}  sx={{color:"#dbc1ac", '&:hover': {backgroundColor: '#dbc1ac', color:"black"}, marginTop:"2px",boxShadow:"0px 5px 10px -5px #000000", width:"20%",borderRadius:2}}>
                Register User</Button></div>)}



            {regClicked && regGood && <FinishReg/>}
            {regClicked && !regGood && <FailReg/>}
        </Paper>


    </div>);
}