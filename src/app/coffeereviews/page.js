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

                <Button variant="contained" color="primary" sx={{float:"right" ,border: "1px solid rgba(219, 193, 172, 0.5)"
, backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"}}}>Make New Post</Button>
                </Link>)}
                </div>
                
                <Typography  
                sx={{ textAlign: 'center', letterSpacing: 6, color: '#dbc1ac',boxShadow: '0px 0px 10px #dbc1ac', border: "1px solid rgba(219, 193, 172, 0.8)", borderRadius: '10px', marginTop:2,fontSize:"26px", fontWeight:0}}
                >
                    Coffee Reviews: 
                    </Typography>
                
                {data.data.map(review => (
                    <div key={review.id} className='review-card' style={{ boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px'}}>
                        <Typography variant='h4' sx={{ color:"#dbc1ac", margin:2}}>{review.attributes.Title}</Typography>
                    <div className='reviewPic' >

                    {/* Conditionally render the image if it exists */}
                    {review.attributes.ProductImage.data && review.attributes.ProductImage.data.length > 0 ? (
                                <img src={`http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.thumbnail.url}`} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}} className='reviewPageImg' alt={`Image for Review ${review.id}`} />
                            ) : (
                                <div className="noImagePlaceholder">No Image</div>
                            )}
                            
                    {/* read more link button */}
                    <Link className="readMoreDiv" href={`/coffeereviews/${review.id}`} key={review.id} style={{textDecoration:"none"}}>
                        <Typography sx={{color:"#38220f"}} variant='h6'>Read More</Typography>
                    </Link></div>

                    
                    {/* rating, details, author,  */}
                    <div className='rating' style={{ boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px',}}>
                        <h3 style={{ fontShadow: '0px 0px 10px black', color: '#dbc1ac'}}>Rating: {review.attributes.Rating}</h3>
                        
                        <div className='detailsPreview'>
                            <p  style={{marginTop:40}}><strong>Details</strong>: {review.attributes.Body.substring(0,60)}...
                            </p>
                            <p style={{marginRight:80}}><strong>Author</strong>: {review.attributes.Author}
                            </p>
                        </div>
                    </div>


                    </div>
                    
                ))}
            </div>
        )
    };









{/* <p className='detailsPreview' style={{marginTop:40}}><strong>Details</strong>: {review.attributes.Body.substring(0,60)}...
                    <div className='authorPrev'><strong>Author</strong>: {review.attributes.Author}
                    </div>
                    </p> */}