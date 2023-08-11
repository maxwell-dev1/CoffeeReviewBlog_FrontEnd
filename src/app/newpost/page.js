'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

//getting rid of parenthesis around useState eliminated useClient error
// so should i try this elsewhere





export default function newPostPage(){

const [title,setTitle] = useState('');
const [rating,setRating] = useState();
const [body,setBody] = useState('');
const [brewMethod,setBrewMethod] = useState('');
const [file, setFile] = useState(null);
const [imgURL, setImgURL] = useState(null)
const router = useRouter();

const handleSubmit = async (event) =>{
    event.preventDefault();

    console.log("submit title:" + title + '. Submitted rating: ' + rating + '. Submitted body: ' + body + " Brewing method: " + brewMethod);
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
                {!imgURL && <input type='file' onChange={handleFile} id='image'></input>}                
                <button type='submit' className='createPostButton'> Create post</button>
                </form>
            </div>                
            {imgURL && <img className='newPostImgPrev' src={imgURL}></img>}

        </div>
    )
}

