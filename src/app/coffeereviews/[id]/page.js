'use client';
import React, { useEffect, useState } from 'react';


import axios from 'axios';


const Details = () => {

    let thisURL = window.location.href;
    
    //used to collect data between / character and put into array
    thisURL =thisURL.split('/')
       //collect that last element of the array above
    let lastSeg = thisURL.pop();

    const [review, setData] = useState({});
    //We use a loading state to make sure the details are ready to be displayed..otherwise they wont render until the user refreshes the page because the page is rendering
    //before the fetch is complete
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        // Function to fetch data

        const fetchData = async () => {
            try {
                // setUrl(lastSeg)
                const response =  await axios.get(`http://localhost:1337/api/coffee-reviews/${lastSeg}/?populate=*`);
                setData(response.data);
                console.log(response.data);
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

    return (

        <div className = 'singleReview'>
            {/* Notation explanation: is loading true? Then render everything in parenthesis of first arg between brackets, otherwise
             if loading is false we load the other argument  */}
            {loading ? (
                <p>Loading....</p>
            ) :
            (
                <h1>Review {id}: {title}</h1>
            )}

        </div>

    );

};




export default Details;