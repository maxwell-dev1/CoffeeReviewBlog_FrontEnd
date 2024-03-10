import { Typography } from '@mui/material';
import React from 'react';

export default function LoginInputs({ activeUser, activePass, handleInputChange1, handleInputChange2, handleLogin }) {
  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
      <Typography htmlFor='username'>
      Enter username:
      </Typography>
      <input type='text' value={activeUser} onChange={handleInputChange1} className='loginIn' />
      <Typography>Enter password:</Typography>
      <input type='password' value={activePass} onChange={handleInputChange2}  className='loginIn' />
      <button onClick={handleLogin} className='loginButton'>Login</button>
    </div>
  );
}
