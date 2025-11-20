'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { api } from '../../../../utils/api';

const Details = ({ params }) => {
  const { id } = params;

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${api.reviews}/${id}`);
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching review:', error);
        setLoading(false);
      }
    };
    if (id) fetchReview();
  }, [id]);

  useEffect(() => window.scrollTo(0, 0), []);

  if (loading) return <p>Loading review...</p>;
  if (!review) return <p>Review not found</p>;

  const imageSrc = review.imageUrl
    ? `https://localhost:7029${review.imageUrl}`
    : null;

  return (
    <div>
      {/* BORDERING BOX match to review cards */}
      <div 
        style={{
          boxShadow: '0px 0px 10px rgb(219, 193, 172)',
          border: '1px solid rgb(236, 224, 209)',
          borderRadius: '10px',
          background:'linear-gradient(rgb(163, 138, 105,.75),rgba(56, 41, 29, 0.928))',
          height:'75vh'
        }}
      >
        {/* Title */}
        <h1 style={{marginLeft:"4%",marginTop:'2%'}}>{review.title}</h1>

        <div style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems: 'flex-start',
          width:'100%'
        }}>

        {/* LEFT: Details */}
        <div style={{marginLeft:'5%',marginRight:'5%',marginTop:'3%',width:'60%', background:'rgba(56,41,29,.8)',borderRadius:'12px',boxShadow: '0px 0px 10px rgba(219, 193, 172,.4)',
          border: '1px solid rgba(236, 224, 209,.3)'}}>
            <div style={{marginLeft:'5%', color:'#f8e8c896'}}>
          <p style={{}}>
            <strong>Rating:</strong> 
            <span style={{marginLeft:'8px'}}>
              {review.rating}/10
            </span>
          </p>
          <p><strong>Brew Method:</strong> {review.brewingMethod || 'Not specified'}</p>
          <p><strong>Author:</strong> {review.username}</p>
          <p>
            <strong>Date:</strong> 
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          {/* Review Body */}
        <div style={{width:'90%',marginTop:'6%', }}>
          <h2 style={{color:'#f8e8c896'}}>Review</h2>
          <div style={{backgroundColor:'#f8e8c896', height:'1px',width:'60'}}></div>
          <p style={{marginBottom:'5%'}}>{review.body}</p>
          </div>
        </div>
        </div>

        {/* RIGHT: Image */}
        {imageSrc ? (
          <div style={{marginRight:'5%',width:'60%'}}>
            <Image
              src={imageSrc}
              alt={review.title}
              width={600}
              height={400}
              style={{ borderRadius: "10px",width:'100%',height:'auto'}}
              unoptimized
            />
          </div>
        ) : (
          <p style={{marginRight:'20%',marginTop:'10%'}}>(no image)</p>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default Details;