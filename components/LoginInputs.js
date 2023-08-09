import React from 'react';

export default function LoginInputs({ activeUser, activePass, handleInputChange1, handleInputChange2, handleLogin }) {
  return (
    <div>
      <div className='loginText'>
      <label htmlFor='username'>
      Enter username:
      </label>
      </div>
      <input type='text' value={activeUser} onChange={handleInputChange1} />
      Enter password:
      <input type='password' value={activePass} onChange={handleInputChange2}  />
      <button onClick={handleLogin} className='loginButton'>Login</button>
    </div>
  );
}
