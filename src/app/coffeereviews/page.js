'use client';
import useFetch from '../../../hooks/useFetch'
// import { useEffect,useState } from "react"
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function reviewpage(){
    const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const router = useRouter();

    const readMore=(id)=>{
        console.log(id)
        //line below commented out because I havent yet set up the individual pages for each review
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
                 <div className='reviewPic'>
                 {/* Display the image URL for each review */}
                 {/* Notice how I append the fetch call url data with {`http://localhost:1337`} */}
                 {/* By the way, if I dont go into .formats.sizehere.url, and just go straight to .data[0].attributes.url , it will give us the actual default image (way too large) */}
                 <img src={`http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.small.url}`} alt={`Image for Review ${review.id}`} />
                 </div>
                 <div className='rating'>
                 <h3>Rating: {review.attributes.Rating}</h3>
                 </div>
                 <div className='detailsPreview'>
                 <p>Details: {review.attributes.Body.substring(0,20)}...</p>
                 </div>
                 {/* Dyanmic routing stuff below */}
                 <div className="readMoreDiv">
                    <Link href={'/coffeereviews/'+ review.id} key={review.id}>
                        <h3>Read More</h3>
                    </Link>
                    </div>
                 <br></br>
                </div>
                
            ))}
        </div>
    )
};

