'use client';
import React, { useState } from 'react';
import { useLogGood } from '/components/LogGoodContext';

const Navbar = () => {
  const { logGood, setLogGood } = useLogGood();

  function logOut(){
    setLogGood(false);
  }

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  console.log('logGood=' + logGood);
  return (
    
    <div className='navLinks'>
    <ul>
      <li>
        <a className="navLink" href="/home">Home</a>
      </li>
      <li>
        <a className="navLink" href="/testpage1">Test Page 1</a>
      </li>
      <li>
      <div className="navDropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <a className="navLink" href="/registration">User menu</a>
            {showDropdown && (
              <div className="dropdownContent">
                <a href="/registration">New Users</a>
                <a href="/login">Login</a>
                {logGood && <a href="" onClick={logOut}>Logout</a>}
              </div>
            )}
          </div>      
      </li>
      <li>
        <a className="navLink" href = "/coffeereviews">Coffee Reviews</a>
      </li>
    </ul>
    </div>
  )
}
 
export default Navbar;