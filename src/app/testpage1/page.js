'use client'
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';
import {useState} from 'react';
import useStrapi from '../../../hooks/useStrapi';

export default function testPage() {
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const {fetchAPI} = useStrapi();
  const myToken = '0da196ac90a697a22e3129cfa649885b5ee066d9bfb436d9ed546a89dd77c536b0732e13307e158a5cb222dff08b918553976e8e56e12002709e55988277d32d6638ce7db4a82cac47cd3e6939b5d0ad670972461372794fe7313781376f80f74ec66174cd8e99e41bba828d52bb68ec2e69a7575abe9ddf99020a7f78a4809e'


  console.log('Value of logGood:', logGood + '. Value of active user: ' + activeUser);

  const form = new FormData();

  const handleNameChange = (e) =>{
    setName(e.target.value);
  }

  // const handleFileChange = (e) =>{
  //   setFile(e.target.files[0])
  // }

  const postData={
    "data": {
      "Name": name
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('name:' + name);

    const response = fetchAPI('/api/tests',
    {
      method:'POST',
      data: postData, 
    },{
    headers:{
    'Authorization': `Bearer${myToken}`
    }})
    
    if (response.status===200){
      console.log('success');
    }
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