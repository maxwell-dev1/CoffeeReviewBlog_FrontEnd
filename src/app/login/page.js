'use client';
import { useState } from 'react';
import React from 'react';
import { useLogGood } from '../../../components/LogGoodContext';
import LoginInputs from '../../../components/LoginInputs';
import { useUserContext } from '../../../components/UserContext';
import { useRouter } from 'next/navigation';
import { useJwtContext } from '../../../components/JwtContext';
import { Paper, Typography } from '@mui/material';
import { api } from '../../../utils/api'; 

export default function LoginPage() {
    const [activePass, setActivePass] = useState("");
    const { logGood, setLogGood } = useLogGood();
    const [activeUser1, setActiveUser1] = useState('');
    const { setActiveUser } = useUserContext();
    const { setJwt } = useJwtContext();
    const router = useRouter();

    const [loginWorked, setLoginWorked] = useState(true);

    const handleInputChange1 = (e) => {
        setActiveUser1(e.target.value);
    };
    const handleInputChange2 = (e) => {
        setActivePass(e.target.value);
    };

    const handleLogin = async () => {
    console.log('Attempting login for username:', activeUser1);

    try {
        const response = await fetch(api.users+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: activeUser1,
                password: activePass
            }),
        });

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        const data = await response.json();        // { token: "eyJ..." }
        const token = data.token;

        console.log('Login successful! JWT:', token);

        setJwt(token);
        setActiveUser(activeUser1);
        setLogGood(true);
        setLoginWorked(true);

    } catch (error) {
        console.log('Login failed:', error.message);
        setLogGood(false);
        setLoginWorked(false);
    }
};

    const FinishLogin = () => {
        router.push('/coffeereviews');
        return (
            <div>
                <Typography variant='h6' sx={{ color: "#dbc1ac" }}>
                    Login Success! Routing you to coffee reviews page...
                </Typography>
            </div>
        );
    };

    function logOut() {
        console.log("Performing logout.");
        setLogGood(false);
        setActiveUser("");
        setJwt("empty");
    }

    console.log("Value of logGood:", logGood);
    console.log("Token:", useJwtContext().jwt); // optional: better to read from context directly

    return (
        <div style={{ display: "flex", justifyContent: "end", marginRight: "40px" }}>
            <img src='CoffeeSignIn.jpg' style={{ height: '88vh', width: "55%", marginRight: '164px', marginTop: "20px", borderRadius: "10px", boxShadow: '0px 0px 15px 5px #dbc1ac' }}></img>
            <Paper sx={{ backgroundColor: "#967259", height: "600px", borderRadius: 10, marginTop: 6, width: "25%", background: "linear-gradient(rgb(163, 138, 105,.85),rgba(56, 41, 29, 0.95))", boxShadow: '0px 0px 15px 5px #dbc1ac', textAlign: "center" }}>
                <h2 style={{ marginTop: '54px' }}>Login</h2>
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
                {logGood && <FinishLogin />}

                {!loginWorked && !logGood && <h3>Login failed...</h3>}
            </Paper>
        </div>
    );
}