    'use client';
    import useFetch from '../../../hooks/useFetch'
    import React from 'react'
    import Link from 'next/link';
    import { useLogGood } from '../../../components/LogGoodContext';
    import { useUserContext } from '../../../components/UserContext';
    import { useJwtContext } from '../../../components/JwtContext';
    import { Typography , Button} from '@mui/material';


    export default function reviewpage(){
        const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
        const {logGood} = useLogGood();
        const {activeUser} = useUserContext();
        const {jwt} = useJwtContext(); // web token 
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
                {/* <button className="newPostBtn" role="button" sx={{marginTop:300}}>Create new post</button> */}
                <Button className='newPostBtn' sx={{color:'white',borderRadius:8}}>Make new post</Button>
                </Link>)}
                </div>
                
                <Typography variant='h4' sx={{textAlign:'center',letterSpacing:6 , color: '#dbc1ac'}}>Coffee Reviews: </Typography>
                
                {data.data.map(review => (
                    <div key={review.id} className='review-card' style={{ boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px'}}>
                    {/* <Typography variant='h4' sx={{marginLeft:3}}>{review.attributes.Title}</Typography> */}
                    <h1 id='reviewCardTitle'>{review.attributes.Title}</h1>
                    <div className='reviewPic' >
                    {/* Conditionally render the image if it exists */}
                    {review.attributes.ProductImage.data && review.attributes.ProductImage.data.length > 0 ? (
                                <img src={`http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.thumbnail.url}`} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}} className='reviewPageImg' alt={`Image for Review ${review.id}`} />
                            ) : (
                                <div className="noImagePlaceholder">No Image</div>
                            )}
                    <Link className="readMoreDiv" href={`/coffeereviews/${review.id}`} key={review.id}>
                        <h3 className='readMoreLink'>Read More</h3>
                    </Link></div>
                    <div className='rating' style={{ boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px'}}>
                    <h3 style={{ fontShadow: '0px 0px 10px black', color: '#dbc1ac'}}>Rating: {review.attributes.Rating}</h3>
                    <p className='detailsPreview'><strong>Details</strong>: {review.attributes.Body.substring(0,60)}...<div className='authorPrev'><strong>Author</strong>: {review.attributes.Author}
                    </div></p>
                    </div>
                    <br></br>
                    </div>
                    
                ))}
            </div>
        )
    };

