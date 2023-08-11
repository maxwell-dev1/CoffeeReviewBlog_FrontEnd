'use client'
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function testPage() {
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();
  const [name, setName] = useState('');
  //HIDE THIS EVENTUALLY OR REPLACE WITH USER JWT POST AUTH
  const myToken = '0da196ac90a697a22e3129cfa649885b5ee066d9bfb436d9ed546a89dd77c536b0732e13307e158a5cb222dff08b918553976e8e56e12002709e55988277d32d6638ce7db4a82cac47cd3e6939b5d0ad670972461372794fe7313781376f80f74ec66174cd8e99e41bba828d52bb68ec2e69a7575abe9ddf99020a7f78a4809e'
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  // const [submitted, setSubmitted] = useState(false);
  const router = useRouter();


  console.log('Value of logGood:', logGood + '. Value of active user: ' + activeUser);


  const handleNameChange = (e) =>{
    setName(e.target.value);
  }

  const handleFileChange = (e) =>{
    const selectedFile = e.target.files[0]
    setFile(selectedFile)


    if(selectedFile){
      const reader = new FileReader();
      reader.onload = (event)=>{
        setImageURL(event.target.result)
      }
      reader.readAsDataURL(selectedFile);
    }
    else{
      setImageURL(null);
    }

  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log('name:' + name);


    const response = await axios.post('http://localhost:1337/api/tests',{
      "data": {
        "Name": name,
        }
    },{
    headers:{
    'Authorization': `Bearer ${myToken}`,
    }
    })

    console.log(response.status);
    const newEntryId = response.data.data.id;
    console.log(newEntryId);
   

    const formData = new FormData();
    formData.append('files', file, '1.png');
    formData.append('ref', 'api::test.test')
    formData.append('refId',newEntryId)
    formData.append('field', 'ProductImage')
    

    ///THIS IS HOW TO DO A NORMAL UPLAOD STRAIGHT TO MEDIA LIBRARY NOT TO AN ENTRY
    // const response2 = await axios.post('http://localhost:1337/api/upload',formData  ,{
    //   headers:{
    //     'Authorization' : `Bearer ${myToken}`
    //   }
    // }
    // );

    //SUCCESS! This is how to do an UPLOAD, not entry creation, of a file and associate with a given entry ID
    const response2 = await axios.post('http://localhost:1337/api/upload',formData  ,{
      headers:{
        'Authorization' : `Bearer ${myToken}`
      }
    }
    );
    console.log(response2.status)
    router.push('/coffeereviews')
  }

  




    return (
    <div className='testPage'>
      
      <div className='testForm'>
      <form id='form'>
      <label>Name:</label>
      <input type='text' value={name} onChange={handleNameChange}></input>
      <label>Image:</label>
      <input type='file' onChange={handleFileChange} ></input>
      <button type='submit' accept="image/*" onClick={handleSubmit}>Submit</button>
      </form>
      </div>
      { imageURL && <img src={imageURL} alt='Selected' />}
      </div>
    )
    
  }