import React from 'react';

export default function LoginInputs({ activeUser, activePass, handleInputChange1, handleInputChange2, handleLogin }) {
  return (
    <div>
      Enter username:
      <input type='text' value={activeUser} onChange={handleInputChange1} />
      Enter password:
      <input type='text' value={activePass} onChange={handleInputChange2} />
      <br />
      <button onClick={handleLogin} className='loginButton'>Login</button>
    </div>
  );
}
