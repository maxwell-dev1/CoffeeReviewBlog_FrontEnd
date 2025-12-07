// app/newpost/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useJwtContext } from '../../../components/JwtContext';
import { Button } from '@mui/material';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [body, setBody] = useState('');
  const [brewMethod, setBrewMethod] = useState('');
  const [file, setFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // renamed from imgURL for clarity

  const router = useRouter();
  const { jwt } = useJwtContext();

  // Protect route
  useEffect(() => {
    if (!jwt || jwt === 'empty' || jwt === '') {
      router.push('/login');
    }
  }, [jwt, router]);

  if (!jwt || jwt === 'empty' || jwt === '') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#dbc1ac' }}>
        <h2>Access Denied</h2>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  // Image preview handler (kept exactly as you had it — works perfectly)
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgPreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgPreview(null);
    }
  };

  // PLACEHOLDER SUBMIT — ready to be replaced with .NET call
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Form submitted:', {
      title,
      rating,
      body,
      brewMethod,
      file: file?.name || 'no file',
    });

    // This is where we'll put the single FormData POST to your .NET endpoint
    // Coming in the next message when you say "go"!

    // Temporary success redirect
    // router.push('/coffeereviews');
  };

  return (
    <div>
      <h2 style={{ color: "#967259" }}>
        Enter data below to create a new coffee review:
      </h2>

      <div
        style={{
          backgroundColor: "rgba(99,72,50,.4)",
          height: '86vh',
          paddingTop: 10,
          marginBottom: 40,
          paddingLeft: 16,
          borderRadius: 10,
          backdropFilter: 'blur(10px)',
          paddingBottom: 14,
          boxShadow: '0px 0px 10px #dbc1ac',
          border: '1px solid #ece0d1',
          overflow: 'auto'
        }}
      >
        <form onSubmit={handleSubmit} style={{ marginLeft: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxHeight: '160px' }}>
            <div style={{ width: '50%' }}>
              <label htmlFor="title" style={{ color: "#967259", marginTop: 40 }}>
                <strong>Post Title:</strong>
              </label>
              <br />
              <input
                className='newPostInput'
                style={{ width: '50%' }}
                type='text'
                required
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Review brewing methods, specific products, or both!'
              />
            </div>

            <div style={{ width: '45%', maxHeight: '200px', marginTop: '4%' }}>
              {imgPreview && (
                <img
                  className='newPostImgPrev'
                  style={{
                    height: 'auto',
                    width: "45%",
                    float: 'right',
                    marginRight: '15%',
                    marginTop: '2%',
                    borderRadius: '12px'
                  }}
                  src={imgPreview}
                  alt="Preview"
                />
              )}
            </div>
          </div>

          <br />

          <label htmlFor='rating' style={{ color: "#967259" }}>
            <strong>Rating</strong>:
          </label>
          <br />
          <input
            className='newPostInput'
            type='number'
            id='rating'
            step="0.1"
            max="10"
            min="0"
            placeholder='Between 0 and 10'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <br />

          <label htmlFor='body' style={{ color: "#967259" }}>
            <strong>Full review</strong>:
          </label>
          <br />
          <textarea
            className='newPostInput bodyInput'
            id='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <br />

          <label htmlFor='brewMethod' style={{ color: "#967259" }}>
            <strong>Brewing Method</strong>:
          </label>
          <br />
          <input
            className='newPostInput'
            type='text'
            id='brewMethod'
            value={brewMethod}
            onChange={(e) => setBrewMethod(e.target.value)}
          />
          <br />

          <label htmlFor='image' style={{ color: "#967259" }}>
            <strong>Upload an Image (optional)</strong>:
          </label>
          <input
            type='file'
            accept="image/*"
            onChange={handleFile}
            id='image'
            className='imageInput'
          />

          <Button
            type='submit'
            variant="contained"
            sx={{
              float: 'right',
              border: '1px solid rgba(219, 193, 172, 0.5)',
              backgroundColor: '#5F3D2E',
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#dbc1ac', color: 'black' },
              marginRight: '5%',
              marginBottom: '10%',
              mt: 3
            }}
          >
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
}