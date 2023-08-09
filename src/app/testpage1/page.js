'use client'
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';
import {useState} from 'react';
import axios from 'axios';


export default function testPage() {
  //this logGood and activeUser stuff was for me to test and track certain things related to user login/logout please ignore for now
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();
  const [name, setName] = useState('');
  // const [file, setFile] = useState(null);
  const myToken = '0da196ac90a697a22e3129cfa649885b5ee066d9bfb436d9ed546a89dd77c536b0732e13307e158a5cb222dff08b918553976e8e56e12002709e55988277d32d6638ce7db4a82cac47cd3e6939b5d0ad670972461372794fe7313781376f80f74ec66174cd8e99e41bba828d52bb68ec2e69a7575abe9ddf99020a7f78a4809e'


  console.log('Value of logGood:', logGood + '. Value of active user: ' + activeUser);

  const formData = new FormData();

  const handleNameChange = (e) =>{
    setName(e.target.value);
  }

  // const handleFileChange = (e) =>{
  //   setFile(e.target.files[0])
  // }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log('name:' + name);
    formData.append('Name', name);


    const response = await axios.post('http://localhost:1337/api/tests',{
      "data": {
        "Name": "Hello",
        }
    },{
    headers:{
    'Authorization': `Bearer ${myToken}`,
    }
    })

    console.log(response.status);
  }

    return (
    <div className='testPage'>
      
      <div className='testForm'>
      <form>
      <label>Name:</label>
      <input type='text' value={name} onChange={handleNameChange}></input>
      <label>Image:</label>
      {/* <input type='file' onChange={handleFileChange} value={file}></input> */}
      <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
      </div>
      </div>
    )
    
  }