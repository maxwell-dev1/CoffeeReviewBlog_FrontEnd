'use client'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Typography , Button} from '@mui/material';
import articleImgs from '../../../../components/ArticleImages';
import React from 'react'; 

const IndivualArticle = () => {

    const [isFirstLoad, setIsFirstLoad] = useState(true)


    const [fetchResponse,setFetchResponse] = useState({})

    let thisURL = window.location.href;
    
    thisURL =thisURL.split('/')    //used to collect data between / character and put into array
    //collect that last element of the array above
    let articleNum = thisURL.pop(); //gives us the  number of the article we want from the last part of the url 


    useEffect(() => {
        if (!isFirstLoad) {
            window.location.reload();
            console.log('reloaded because isFirstLoad was false')            

        } else {
            setIsFirstLoad(false)    
            
            console.log('didnt reload cuz is first load is true but now its false')
        }
    }, []);
    


    const fetchFactData = async () => {
            try{
                const res = await axios.get(`http://localhost:1337/api/learns/${articleNum}`) //remember to use backtick notation
                setFetchResponse(res.data) //make sure to set it to .data BEFORE parsing the data from the object later on    
            }
            catch(error){
                console.error('error')
            }
        }
        
        
        fetchFactData();

    

    

    let data = fetchResponse.data //remember i already set to .data in the response from axios
    console.log(data?.id)
    console.log(data?.attributes) ///IMPORTANT question mark suddenly makes this work i guess...



    return(
        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1 style={{ color: "#967259", textAlign: 'left' }}>Article {articleNum} </h1>
                <h2 style={{ color: "rgba(236,224,209,.9)", marginLeft: 'auto' }}>By {data?.attributes?.Author}</h2>
            </div>

            <div style={{backgroundColor:"rgba(99,72,50,.4)",height:'190vh',paddingTop:10,marginBottom:40,paddingLeft:16,borderRadius:10,backdropFilter:'blur(10px)',paddingBottom:14, boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1'}}>
                <div style={{ textAlign:'center',alignItems:'center'}}>
                    {/* TITLE                 */}
                    <h1 style={{color: "rgba(236,224,209,.9)"}}> {data?.attributes?.Title} </h1>
                    {/* div only for underline */}
                    <div style={{ backgroundColor: 'rgba(219,193,172,.4)', height: '2px', width: '95%', boxShadow: '0px 0px 10px rgba(0,0,0,.4)', borderRadius: '10px' }}></div>
                    {/* IMAGE */}
                    <img src={articleImgs[articleNum-1]} style={{height:'325px', width:'450px', borderRadius:'8px', marginBottom:'24px',marginTop:'22px'
                    ,boxShadow: '0px 0px 10px #000000', }}>
                    </img>
                </div>
                {/* article body */}
               <Typography sx={{width:'94%',marginLeft:'20px', color:'rgba(219,193,172,.8)'}}> 
                    {data?.attributes?.Body && data.attributes?.Body.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                    ))}
                </Typography>
                <div style={{display:'flex',justifyContent:'center',marginTop:'22px'}}>                
                    <Button href='/learn' className='loginButton' variant="contained" color="primary" sx={{border: "1px solid rgba(219, 193, 172, 0.5)"
, backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"}}}>Learn More About Coffee!</Button>
                </div>
            </div>
        </div>
    )
}

export default IndivualArticle 