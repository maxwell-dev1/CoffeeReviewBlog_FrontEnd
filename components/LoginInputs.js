import React from 'react';

export default function LoginInputs({ activeUser, activePass, handleInputChange1, handleInputChange2, handleLogin }) {
  return (
    <div>
      <label htmlFor='username'>
      Enter username:
      </label>
      <input type='text' value={activeUser} onChange={handleInputChange1} className='loginIn' />
      Enter password:
      <input type='password' value={activePass} onChange={handleInputChange2}  className='loginIn' />
      <button onClick={handleLogin} className='loginButton'>Login</button>
    </div>
  );
}
