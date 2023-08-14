'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'

export default function newPostPage(){

const [title,setTitle] = useState('');
const [rating,setRating] = useState();
const [body,setBody] = useState('');
const [brewMethod,setBrewMethod] = useState('');
const [file, setFile] = useState(null);
const [imgURL, setImgURL] = useState(null)
const router = useRouter();
const superToken = '0da196ac90a697a22e3129cfa649885b5ee066d9bfb436d9ed546a89dd77c536b0732e13307e158a5cb222dff08b918553976e8e56e12002709e55988277d32d6638ce7db4a82cac47cd3e6939b5d0ad670972461372794fe7313781376f80f74ec66174cd8e99e41bba828d52bb68ec2e69a7575abe9ddf99020a7f78a4809e'

const handleSubmit = async (event) =>{
    event.preventDefault();
    console.log("submit title:" + title + '. Submitted rating: ' + rating + '. Submitted body: ' + body + " Brewing method: " + brewMethod);
    
    const postText = await axios.post('http://localhost:1337/api/coffee-reviews', {
        "data":{
            "Rating" : rating,
            "Title": title,
            "Body": body,
            "BrewingMethod": brewMethod
        }
    })
    console.log(postText.status);
    const id = postText.data.data.id;

    const formData =   new FormData();
    formData.append('files',file)
    formData.append('ref','api::coffee-review.coffee-review')
    formData.append('refId',id)
    formData.append('field','ProductImage')

    const postImg = await axios.post('http://localhost:1337/api/upload',formData, {
        headers:{
            'Authorization': `Bearer ${superToken}`
        }
    })
    console.log(postImg.status);
    router.push('/coffeereviews')
}

const handleFile = (e) =>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if(selectedFile){
        const reader = new FileReader();
        reader.onload = (event) =>{
            setImgURL(event.target.result)
        }
        reader.readAsDataURL(selectedFile);
    }
    else {setImgURL(null)}
    console.log(imgURL)

}



    return(
        <div>
            <h2>Enter data below to create a new coffee review:</h2>
            <div className='newPostForm'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="title"><strong>Post Title</strong></label>
                <br></br>
                <input className='newPostInput' type='text' required id='title' name='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Review brewing methods, specific products, or both!'></input>
                <br></br>
                <label htmlFor='rating'><strong>Rating</strong>: </label>
                <br></br>
                <input className='newPostInput' type='text' id='rating' name='rating'  placeholder='Between 0 and 10' value={rating} onChange={(e)=>{setRating(e.target.value)}}></input>
                <br></br>
                <label htmlFor='body'><strong>Full review</strong>: </label>
                <br></br>
                <textarea className='newPostInput bodyInput' type='text'  id='body' name='body' value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
                <br></br>
                <label htmlFor='brewMethod'><strong>Brewing Method</strong>:</label>
                <br></br>
                <input className='newPostInput' type='text' id='brewMethod' name='brewMethod' value={brewMethod} onChange={(e)=>{setBrewMethod(e.target.value)}}></input>
                <br></br>
                <label htmlFor='image'><strong>Upload an Image</strong>:</label>
                {!imgURL && <input type='file' onChange={handleFile} id='image' className='imageInput'></input>}                
                <button type='submit' className='createPostButton'> Create post</button>
                </form>
            </div>                
            {imgURL && <img className='newPostImgPrev' src={imgURL}></img>}

        </div>
    )
}

