import { Typography } from '@mui/material';
import React from 'react';

export default function LoginInputs({ activeUser, activePass, handleInputChange1, handleInputChange2, handleLogin }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <div>
        <Typography htmlFor='username'>Enter username:</Typography>
        <input type='text' value={activeUser} onChange={handleInputChange1} className='loginIn' />
      </div>
      <div>
        <Typography>Enter password:</Typography>
        <input type='password' value={activePass} onChange={handleInputChange2} className='loginIn' />
      </div>
    <button onClick={handleLogin} className='loginButton'>Login</button>
  </div>
  
  );
}
