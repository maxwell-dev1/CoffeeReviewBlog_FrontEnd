'use client';
import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material'

import axios from 'axios';


const Details = () => {
    //Since I did all that flashy stuff with the ScrollAwareFooter, We need to reset the scroll bar to start for some pages.
    window.scrollTo(0,0);

    let thisURL = window.location.href;
    
    //used to collect data between / character and put into array
    thisURL =thisURL.split('/')
    //collect that last element of the array above
    let lastSeg = thisURL.pop();
    let imgURL = null;

    const [review, setData] = useState({});
    //We use a loading state to make sure the details are ready to be displayed..otherwise they wont render until the user refreshes the page because the page is rendering
    //before the fetch is complete
    const [loading, setLoading] = useState(true)
    let noImg = false;


    useEffect(() => {

        // Function to fetch data

        const fetchData = async () => {
            try {
                const response =  await axios.get(`http://localhost:1337/api/coffee-reviews/${lastSeg}/?populate=*`);
                setData(response.data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };



        fetchData();

        //its necesarry that we include lastSeg as a second argument here, otherwise we have the same problem mentioned below of items not rendering until user refresh
    }, [lastSeg]);


    //trying to stringify data before displaying it and then just rendering data in the component's return statement will break the program.
    //instad we createt a new constant and render that. 
     
     let id = review.data?.id
     let title = review.data?.attributes.Title;
     let rating=review.data?.attributes.Rating;
     if(review.data?.attributes.ProductImage.data){
         noImg = true;
         imgURL= review.data?.attributes.ProductImage.data[0].attributes.formats.medium.url;
     }
     let body = review.data?.attributes.Body;
     let author = review.data?.attributes.Author;
     let brew = review.data?.attributes.BrewingMethod;
     console.log(rating);
     console.log(title);
     console.log(id)
     if(!noImg){
     console.log(imgURL)
     }
     console.log(author)
    return (

        <div >
            <div style={{backgroundColor:"rgba(99,72,50,.4)",height:'150vh',paddingTop:10,marginBottom:40,paddingLeft:16,borderRadius:10,backdropFilter:'blur(10px)',paddingBottom:14, boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1'}}>


            {/* Notation explanation: is loading true? Then render everything in parenthesis of first arg between brackets, otherwise
             if loading is false we load the other argument  */}
            {loading ? (
                <p>Loading....</p>
            ) :
            (   
            <div >
            <div className = 'singleReview'>
                <div className= 'singleTitle'>
                <h1 style={{color:'#dbc1ac'}}>{title}</h1>
                </div>
                {/* This next div is just the underline */}
                <div style={{ backgroundColor: 'rgba(219,193,172,.4)', height: '2px', width: '95%', boxShadow: '0px 0px 10px rgba(0,0,0,.4)', borderRadius: '10px' }}></div>
                
                <div style={{ textAlign:'center',alignItems:'center'}}>
                    {imgURL ? (<img className='singleImage' src= {`http://localhost:1337${imgURL}`}/>) : (<p id='noImgText'>(no image)</p>)}
                </div> 

                <div className='singleBody' style={{marginTop:'7%'}}>
                    <p style={{color:'#dbc1ac'}}><strong>Review</strong>: {body}</p>
                    <p style={{color:'#dbc1ac'}}><strong>Brew Method </strong>: {brew}</p>
                    <p style={{color:'#dbc1ac'}}><strong>Author</strong>: {author}</p>
                </div>

            </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'22px'}}>                
                    <Button href='/coffeereviews' className='loginButton' variant="contained" color="primary" sx={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"}}}>See more reviews!</Button>
                </div>
                </div>
            )}
            </div>
        </div>

    );

};




export default Details;