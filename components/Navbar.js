'use client';
import React, { useState } from 'react';
import { useLogGood } from '/components/LogGoodContext';
import { useUserContext } from 'components/UserContext';
import { useJwtContext } from './JwtContext';


const Navbar = () => {
  const { logGood, setLogGood } = useLogGood();
  const {setActiveUser} = useUserContext();
  const {setJwt} = useJwtContext();
  
  function logOut(){
    setLogGood(false);
    setActiveUser("");
    setJwt("empty")
  }

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  console.log('Navbar test for logGood=' + logGood);
  return (
    
    <div className='navLinks'>
    <ul>
      <li>
        <a className="navLink" href="/">Home</a>
      </li>
      {/* <li>
        <a className="navLink" href="/testpage1">Test Page 1</a>
      </li> */}
      <li>
      <div className="navDropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <a className="navLink" >User menu</a>
            {showDropdown && (
              <div className="dropdownContent">
                <a href="/registration">New Users</a>
                {!logGood && <a href="/login">Login</a>}
                {logGood && <a href="" onClick={logOut}>Logout</a>}
              </div>
            )}
          </div>      
      </li>
      <li>
        <a href='/'><img src='/logo1.png' height={100} width={100} style={{borderRadius:50,marginLeft:24}}></img></a>
      </li>
      <li>
        <a className="navLink" href = "/coffeereviews">Coffee Reviews</a>
      </li>
      
      <li>
        <a href='/learn'>Learn Coffee</a>
      </li>
    </ul>
    </div>
  )
}
 
export default Navbar;