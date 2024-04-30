'use client'
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material'
import useFetch from '../hooks/useFetch';
import {useEffect, useState} from 'react'
import axios from 'axios';




export default function CoffeeCodexPanel(){
    const [fetchResponse,setFetchResponse] = useState({})

    let num= Math.floor(Math.random() * (154 - 44 + 1)) + 44;  //geneartes a random num between 44 and 154 since these are the id range of facts


    useEffect( () =>{

    
        const fetchFactData = async () => {
            try{
                const res = await axios.get(`http://localhost:1337/api/facts/${num}`) //remember to use backtick notation
                setFetchResponse(res.data) //make sure to set it to .data BEFORE parsing the data from the object later on
            }
            catch(error){
                console.error('error')
            }
        }
        fetchFactData();
    }, [])






    let data = fetchResponse.data //remember i already set to .data in the response from axios
    console.log(data)
    console.log(data?.id)
    console.log(data?.attributes) ///IMPORTANT question mark suddenly makes this work i guess...
    let fact = data?.attributes.FactItself

    
    


    const handleNextFact = async () => {
        try {
            if (data?.id + 1 <= 154) {
                num = data?.id + 1
                const res = await axios.get(`http://localhost:1337/api/facts/${num}`);
                setFetchResponse(res.data);
            }
            else {
                num = data?.id -109
                const res = await axios.get(`http://localhost:1337/api/facts/${num}`);
                setFetchResponse(res.data);
            }

        } catch (error) {
            console.error('error', error);
        }
    };
    
    const handlePrevFact = async () => {
        try {
            if (data?.id - 1 >= 44) {
                num = data?.id - 1
                const res = await axios.get(`http://localhost:1337/api/facts/${num}`);
                setFetchResponse(res.data);
            }
            else {
                num = data?.id + 109
                const res = await axios.get(`http://localhost:1337/api/facts/${num}`);
                setFetchResponse(res.data);
            }
        } catch (error) {
            console.error('error', error);
        }
    };
    
    const handleShuffleFacts = async () => {
        try {
            num = Math.floor(Math.random() * (154 - 44 + 1)) + 44;
            const res = await axios.get(`http://localhost:1337/api/facts/${num}`);
            setFetchResponse(res.data);
        } catch (error) {
            console.error('error', error);
        }
    };
    


    return (          
        <div>  
            <div style={{display:'flex'}}>
            <Button style={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},height:"36px", margin:'auto'}} onClick={handlePrevFact}>Prev</Button>

            <div style={{width:'60%', boxShadow: '0px 0px 10px #dbc1ac', border: '1px solid #ece0d1', borderRadius: '10px', background:'linear-gradient(rgb(163, 138, 105,.75),rgba(56, 41, 29, 0.928))', height:'18vh', margin:'auto', display:'flex', justifyContent:'center', alignItems: 'center',marginTop:'2px'}}>
                        <div style={{backgroundColor:'rgba(56,34,15,.8)', height:'82%', width:'85%', borderRadius:'10px', boxShadow: 'inset 0px 0px 10px rgba(0,0,0,.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                                <Typography style={{fontSize:'20px', textShadow:'0px 0px 10px #dbc1ac',color:"rgba(219,193,172,1)",wordSpacing:'1em'}}>
                                The Coffee Codex 
                                {/* (thou shalt tips) */}
                            </Typography>   
                            <div style={{backgroundColor:'rgba(219,193,172,.4)',height:'2px',width:'95%',boxShadow: '0px 0px 10px rgba(0,0,0,.4)',borderRadius:'10px'}}></div>
                            <Typography style={{width:'90%',marginBottom:'8px',textShadow:'0px 0px 10px #dbc1ac',color:"rgba(219,193,172,.95)",marginTop:'8px', fontSize:"14px"}}>
                                {fact}
                            </Typography>
                        </div>
                                
                    </div>
                    <Button style={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},height:"36px", margin:'auto'}} onClick={handleNextFact}>Next</Button>

</div>  



                <Button style={{border: "1px solid rgba(219, 193, 172, 0.5)", backgroundColor: '#5F3D2E',  color: '#FFFFFF', '&:hover': {backgroundColor: '#dbc1ac', color:"black"},height:"24px",fontSize:'13px', marginLeft:"48%",marginTop:'14px' }} onClick={handleShuffleFacts}>Shuffle</Button>
            
                    </div>  
            )
}