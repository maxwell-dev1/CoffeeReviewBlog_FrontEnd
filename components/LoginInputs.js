import { Typography,Button } from '@mui/material';
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
    <Button onClick={handleLogin} className='loginButton' variant="contained" color="primary" sx={{border: "1px solid rgba(219, 193, 172, 0.5)"
, backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"}}} >Login</Button>
  </div>
  
  );
}
