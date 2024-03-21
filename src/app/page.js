'use client';
import useFetch from '/hooks/useFetch'
import {React, useState, useEffect} from 'react'
import { useLogGood } from '/components/LogGoodContext';
import { useUserContext } from '/components/UserContext';
import { useJwtContext } from '/components/JwtContext';
import { Typography, Paper, Card, Box} from '@mui/material';
import Carousel from 'react-material-ui-carousel';



export default function rootpage(){
    const [reviewImages, setReviewImages] = useState([]);
    const [reviewLinks, setReviewLinks] = useState([])
    const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const {logGood} = useLogGood();
    const {activeUser} = useUserContext();
    const {jwt} = useJwtContext();
    console.log('logGood = ' + logGood + '.' + ' active user is: ' + activeUser)

    useEffect(() => {
            if (!loading && !error && data) {

                const images = data.data.map(review => `http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.medium.url}`);
                setReviewImages(images);  
                const links = data.data.map(review => `http://localhost:3000/coffeereviews/${review.id}`)
                setReviewLinks(links);
            }
        }, [loading, error, data]);
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error!...Failed to fetch info from Strapi back end</p>
    }

    console.log(data);    console.log(jwt)


    data.data.reverse()    //reversing the data array allows me to display most recent entries first


    




    return (
        <div>
            
            {/* Title texts */}
            <div className='landingTitlesContainer'>
            <Typography  sx={{letterSpacing:6, marginTop:2 , marginLeft:48, color:'#dbc1ac', fontSize:32}}>Featured Articles: </Typography> {/* replace with data for learn cofee articles instead of reviews */}
            <Typography  sx={{letterSpacing:6, marginTop:2 , marginLeft:62, color:'#dbc1ac', marginBottom:2, fontSize:32}}>Recent Reviews: </Typography>
            </div>
            
            {/* Div contains both recent posts carousel and featured articles  but not their text titles above them   */}
            <div className="homeCardCont">
                <Paper className="homeTopCards"  sx={{backgroundColor:"rgba(0,0,0,0)", marginLeft:10, width:"45%",}} >
                    {data.data.map(review => ( 
                        <Card elevation={8} sx={{         backgroundColor: "rgba(219, 193, 172,.20)",
                        backgroundImage: "linear-gradient(to right, rgba(219, 193, 172, .15), rgba(0,0,0,.15))",marginBottom:6, height:"12%", backdropFilter: "blur(10px)"}}>
                            <Typography variant='h4' sx={{marginLeft:6, marginTop:3,color:"#dbc1ac" }}>{review.attributes.Title}</Typography>
                        </Card>
                    ))} {/* replace with data for learn cofee articles instead of reviews */}
                </Paper>


                <Paper className="carouselHome" sx={{backgroundColor:"black",marginLeft:10,borderRadius:2, height:"80vh", width:"42%",}} >
                <div className="carouselContainer">
                    <Box sx={{ width: '80%', margin: '0 auto', height: '140%', '& .css-1m9128y': { marginTop: '30px' } }}>
                        
                        <Carousel sx={{ backgroundColor: 'black', color: 'black', borderRadius: '15px', height: '70%', width: '75%', margin: '0 auto' }}>
                            
                            {reviewImages.map((image, i) => (
                                <Paper key={i} sx={{ backgroundColor: 'black', marginTop: '20px', height: '60%' }}>
                                    <Box sx={{ width: '100%', height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: '0 auto' }}>
                                        <a href={reviewLinks[i]}>
                                            <img src={image} alt={`Review Image ${i}`} style={{ maxWidth: '100%', maxHeight: '100%',borderRadius:10 }}/>
                                        </a>
                                    </Box>

                                </Paper>
                            ))}
                        </Carousel>
                    </Box>
                </div>      
                </Paper>

                
            </div>


        </div>
    )
};

