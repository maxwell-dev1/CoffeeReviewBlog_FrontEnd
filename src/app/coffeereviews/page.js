'use client';
import useFetch from '../../../hooks/useFetch'
// import { useEffect,useState } from "react"
import React from 'react'
import { useRouter } from 'next/navigation'


export default function reviewpage(){
    const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const router = useRouter();

    const readMore=(id)=>{
        console.log(id)
        console.log(data.data[0].attributes.ProductImage.data[0].attributes.url);
        // router.push('/coffeereviews/' + id)
    }

    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error!...Failed to fetch info from Strapi back end</p>
    }

    console.log(data);

    return (
        <div>
            <h2>Cofee reviews: </h2>
            {data.data.map(review => (
                <div key={review.id} className='review-card'>
                 <h1>Review {review.id}: {review.attributes.Title}</h1>
                 {/* <div className='reviewPic'>
                 <p>Testteststest</p>{review.attributes.ProductImage.data.map(picnav=> (
                    <p>{picnav.id}</p>
                 ))}
                 </div> */}
                 <div className='rating'>
                 <h3>Rating: {review.attributes.Rating}</h3>
                 </div>
                 <div className='detailsPreview'>
                 <p>Details: {review.attributes.Body.substring(0,20)}...</p>
                 </div>
                 <div className='readMoreButton'>
                 {/*MUST USE ARROW FUNCTIONS FOR EVENT HANDLERS */}
                 <button onClick={()=>readMore(`${review.id}`)}>Read more</button>
                 </div>
                 <br></br>
                </div>
                
            ))}
        </div>
    )
};

