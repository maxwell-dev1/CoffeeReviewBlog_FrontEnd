'use client';
import useFetch from '../../../hooks/useFetch';
import { api } from '../../../utils/api';
import React from 'react';
import Link from 'next/link';
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';
import { useJwtContext } from '../../../components/JwtContext';
import { Typography, Button } from '@mui/material';

export default function ReviewPage() {
  const { loading, error, data } = useFetch(api.reviews);
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();
  const { jwt } = useJwtContext();

  console.log('logGood = ' + logGood + '. active user is: ' + activeUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(data);
  console.log(jwt);

  // newest first
  const reviews = [...data.data].reverse();

  return (
    <div>
      <div className="post-button-container">
        {logGood && (
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
        <div
          key={review.id}
          className="review-card"
          style={{
            boxShadow: '0px 0px 10px #dbc1ac',
            border: '1px solid #ece0d1',
            borderRadius: '10px',
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
                    marginTop: '8px',
                }}
                >
              <p>
                <strong>Details</strong>: {review.body.substring(0, 60)}...
              </p>

              
               

                {/* Read More - pushed to the right */}
                <Link
                    href={`/coffeereviews/${review.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Typography
                    sx={{
                        color: '#38220f',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                    }}
                    variant="h6"
                    >
                    Read More
                    </Typography>
                </Link>
                </div>

              <p style={{ margin: 0 }}>
                    <strong>Author</strong>: {review.username}
                </p>
            </div>
            
          {/* <div className="reviewPic">
            {review.imageUrl ? (
              <img
                src={`https://localhost:7029${review.imageUrl}`}
                style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                className="reviewPageImg"
                alt={`Image for Review ${review.id}`}
              />
            ) : (
              <div className="noImagePlaceholder">No Image</div>
            )}



            
          </div>
 */}


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
      ))}
    </div>
  );
}