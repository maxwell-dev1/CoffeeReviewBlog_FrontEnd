'use client';
import useFetch from '../../../hooks/useFetch'
import React from 'react'
import Link from 'next/link';
import { useLogGood } from '../../../components/LogGoodContext';
import { useUserContext } from '../../../components/UserContext';
import { useJwtContext } from '../../../components/JwtContext';


export default function reviewpage(){
    const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const {logGood} = useLogGood();
    const {activeUser} = useUserContext();
    const {jwt} = useJwtContext();
    console.log('logGood = ' + logGood + '.' + ' active user is: ' + activeUser)

    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error!...Failed to fetch info from Strapi back end</p>
    }

    console.log(data);
    console.log(jwt)

    //reversing the data array allows me to display most recent entries first
    data.data.reverse()

    return (
        <div>
            <div className='post-button-container'>
            {logGood && (<Link href='/newpost'> 
            <button className="newPostBtn" role="button">Create new post</button>
            </Link>)}
            </div>
            <h2>Cofee reviews: </h2>
            {data.data.map(review => (
                <div key={review.id} className='review-card'>
                 <h1>{review.attributes.Title}</h1>
                 <div className='reviewPic'>
                {/* Conditionally render the image if it exists */}
                {review.attributes.ProductImage.data && review.attributes.ProductImage.data.length > 0 ? (
                            <img src={`http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.thumbnail.url}`} className='reviewPageImg' alt={`Image for Review ${review.id}`} />
                        ) : (
                            <div className="noImagePlaceholder">No Image</div>
                        )}
                 <Link className="readMoreDiv" href={`/coffeereviews/${review.id}`} key={review.id}>
                    <h3>Read More</h3>
                 </Link></div>
                 <div className='rating'>
                 <h3>Rating: {review.attributes.Rating}</h3>
                 {/* </div> */}
                 {/* <div className='detailsPreview'> */}
                 <p className='detailsPreview'><strong>Details</strong>: {review.attributes.Body.substring(0,60)}...<p className='authorPrev'><strong>Author</strong>: ChrisP</p></p>
                 
                 </div>
                 {/* Dyanmic routing stuff below */}
                 {/* <div className="readMoreDiv"> */}
                    {/* By using the backtick notation with ${review.id} we dynamically send the review's id to Details component in [id].js */}
                    
                    {/* </div> */}
                 <br></br>
                </div>
                
            ))}
        </div>
    )
};

