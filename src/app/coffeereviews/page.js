'use client';
import useFetch from '../../../hooks/useFetch';
import { api } from '../../../utils/api';
import React from 'react';
import Link from 'next/link';
import { useJwtContext } from '../../../components/JwtContext';
import { Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const { loading, error, data } = useFetch(api.reviews);
  const router = useRouter(); // remember to use curly braces for things like load,error, jwt for the other const- which absorbs properties from an object. Without curly braces, we are using the ojbect itself "router"
  const { jwt } = useJwtContext();


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);
  console.log("jwt: " + jwt); // DO NOT ALLOW THIS INTO PRODUCTION --- DEV PURPOSES ONLY

  const reviews = [...data.data]//conveniently named var to display data in html  

  return (
    <div>
      <div className="post-button-container">
        {jwt && jwt !== 'empty' && (
          <Link href="/newpost">
            <Button
              variant="contained"
              color="primary"
              sx={{
                float: 'right',
                border: '1px solid rgba(219, 193, 172, 0.5)',
                backgroundColor: '#5F3D2E',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#dbc1ac', color: 'black' },
              }}
            >
              Make New Post
            </Button>
          </Link>
        )}
      </div>

      <Typography
        sx={{
          textAlign: 'center',
          letterSpacing: 6,
          color: '#dbc1ac',
          boxShadow: '0px 0px 10px #dbc1ac',
          border: '1px solid rgba(219, 193, 172, 0.8)',
          borderRadius: '10px',
          marginTop: 2,
          fontSize: '26px',
          fontWeight: 0,
        }}
      >
        Coffee Reviews:
      </Typography>

      {reviews.map((review) => (
        // <div className="review-card-wrapper">
        <div
          onClick={() => router.push(`/coffeereviews/${review.id}`)}
          key={review.id}
          className="review-card"
          style={{
            boxShadow: '0px 0px 10px #dbc1ac',
            border: '1px solid #ece0d1',
            borderRadius: '10px',
            cursor:'pointer',
            width:'96%',
            
          }}
        >
          <Typography variant="h5" sx={{ color: '#dbc1ac', ml:14, mt:2}}>
            {review.title}
          </Typography>
            <div className="detailsPreview">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '4px',
                }}
                >
              <p style={{width:'60%'}}>
                <strong>Details</strong>: {review.body.substring(0, 60)}...
              </p>

                <div className="reviewPic">
                  {review.imageUrl ? (
                    <img
                      src={`https://localhost:7029${review.imageUrl}`}
                      style={{width:'80px', height:'auto'}}
                      className="reviewPageImg"
                      alt={`Image for Review ${review.id}`}
                    />
                  ) : (
                    <div className="noImagePlaceholder">  </div>
                  )}
            
                </div>

              </div>

              <p style={{ margin:0 }}>
                    <strong>Author</strong>: {review.username}
                </p>
            </div>
            

          {/* Rating*/}
          <div
            className="rating"
            style={{
              boxShadow: '0px 0px 10px #dbc1ac',
              border: '1px solid #ece0d1',
              borderRadius: '10px',
            }}
          >
            <h3 style={{ fontShadow: '0px 0px 10px black', color: '#dbc1ac' }}>
              Rating: {review.rating}
            </h3>

            
          </div>
          
        </div>
        // </div>
      ))}
    </div>
  );
}