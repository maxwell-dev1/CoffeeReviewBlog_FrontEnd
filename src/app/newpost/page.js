'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useJwtContext } from '../../../components/JwtContext';
import { useUserContext } from '../../../components/UserContext';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState();
    const [body, setBody] = useState('');
    const [brewMethod, setBrewMethod] = useState('');
    const [file, setFile] = useState(null);
    const [imgURL, setImgURL] = useState(null);
    const router = useRouter();
    const { jwt } = useJwtContext();
    const { activeUser } = useUserContext();

    // NEW: Protection — redirect if no valid JWT
    useEffect(() => {
        if (!jwt || jwt === 'empty' || jwt === '') {
            router.push('/login');
        }
    }, [jwt, router]);

    // Optional: show a quick message while redirecting
    if (!jwt || jwt === 'empty' || jwt === '') {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#dbc1ac' }}>
                <h2>Access Denied</h2>
                <p>Redirecting to login...</p>
            </div>
        );
    }

    // Everything below this line only renders for logged-in users
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit title:" + title + '. Submitted rating: ' + rating + '. Submitted body: ' + body + " Brewing method: " + brewMethod);

        try {
            const postTextResponse = await fetch('http://localhost:1337/api/coffee-reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    data: {
                        Rating: rating,
                        Title: title,
                        Body: body,
                        BrewingMethod: brewMethod,
                        Author: activeUser
                    }
                })
            });

            if (!postTextResponse.ok) {
                throw new Error('Failed to create post');
            }

            console.log(postTextResponse.status);
            const postData = await postTextResponse.json();
            const id = postData.data.id;

            if (imgURL !== null && file !== null) {
                const formData = new FormData();
                formData.append('files', file);
                formData.append('ref', 'api::coffee-review.coffee-review');
                formData.append('refId', id);
                formData.append('field', 'ProductImage');

                const postImgResponse = await fetch('http://localhost:1337/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    },
                    body: formData
                });

                if (!postImgResponse.ok) {
                    throw new Error('Failed to upload image');
                }

                console.log(postImgResponse.status);
            }

            router.push('/coffeereviews');
        } catch (error) {
            console.error('There was a problem:', error);
        }
    };

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgURL(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImgURL(null);
        }
    };

    return (
        <div>
            <h2 style={{color:"#967259"}}>Enter data below to create a new coffee review:</h2>
            <div style={{backgroundColor:"rgba(99,72,50,.4)",height:'86vh',paddingTop:10,marginBottom:40,paddingLeft:16,borderRadius:10,backdropFilter:'blur(10px)',paddingBottom:14, boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1'}}>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"flex"}}> 
                        <label htmlFor="title" style={{color:"#967259", marginLeft:40, marginTop:40}}><strong>Post Title:</strong></label>
                        <br />
                        <input className='newPostInput' type='text' required id='title' name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Review brewing methods, specific products, or both!'></input>
                    </div>
                    <br />
                    <label htmlFor='rating' style={{color:"#967259"}}><strong>Rating</strong>: </label>
                    <br />
                    <input className='newPostInput' type='text' id='rating' name='rating' placeholder='Between 0 and 10' value={rating} onChange={(e) => { setRating(e.target.value) }}></input>
                    <br />
                    <label htmlFor='body' style={{color:"#967259"}}><strong>Full review</strong>: </label>
                    <br />
                    <textarea className='newPostInput bodyInput' type='text' id='body' name='body' value={body} onChange={(e) => { setBody(e.target.value) }}></textarea>
                    <br />
                    <label htmlFor='brewMethod' style={{color:"#967259"}}><strong>Brewing Method</strong>:</label>
                    <br />
                    <input className='newPostInput' type='text' id='brewMethod' name='brewMethod' value={brewMethod} onChange={(e) => { setBrewMethod(e.target.value) }}></input>
                    <br />
                    <label htmlFor='image' style={{color:"#967259"}}><strong>Upload an Image</strong>:</label>
                    {!imgURL && <input type='file' onChange={handleFile} id='image' className='imageInput'></input>}
                    <button type='submit' className='createPostButton'> Create post</button>
                </form>
            </div>
            {imgURL && <img className='newPostImgPrev' src={imgURL}></img>}
        </div>
    );
}