'use client';
import useFetch from '/hooks/useFetch'
import React from 'react'
import Link from 'next/link';
import { useLogGood } from '/components/LogGoodContext';
import { useUserContext } from '/components/UserContext';
import { useJwtContext } from '/components/JwtContext';
import { Typography , Button, Paper, Card} from '@mui/material';


export default function rootpage(){
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

    //use data.data to access JSON details
    return (
        <div>
            
            {/* Title texts */}
            <div className='landingTitlesContainer'>
            <Typography variant='h5' sx={{letterSpacing:6, marginTop:2 , marginLeft:32, color:'#dbc1ac'}}>Featured Articles: </Typography>
            <Typography variant='h5' sx={{letterSpacing:6, marginTop:2 , marginLeft:74, color:'#dbc1ac'}}>Recent Posts: </Typography>
            </div>
            
            {/* Div contains both recent posts carousel and featured articles  but not their text titles above them*/}
            <div className="homeCardCont">
                <Paper className="homeTopCards" elevation={16} sx={{backgroundColor:"#634832", marginLeft:10,borderRadius:2}} >
                    {data.data.map(review => (
                        <Card elevation={8} sx={{backgroundColor:"#dbc1ac",marginTop:2,marginBottom:6}}>
                            <Typography variant='h4' sx={{marginLeft:2}}>{review.attributes.Title}</Typography>
                        </Card>
                    ))} 
                </Paper>
                <Paper className="homeTopCards2" sx={{backgroundColor:"black",marginLeft:10,borderRadius:2}} >
                    <Typography sx={{color:"white"}}>Carousel here</Typography>
                   
                </Paper>
            </div>


        </div>
    )
};




 {/* {data.data.map(review => (
                <Typography variant='h7'>{review.attributes.Title}</Typography>
            ))} */} {/* <Paper sx={{color:"white"}} elevation={24}>blah blah</Paper>
                    <Card sx={{color:"white"}} elevation={4}>blah blah</Card>

                    {data.data.map(review => (
                        <Typography variant='h4'>{review.attributes.Title}</Typography>
                    ))}  */}