'use client';
import React, { useEffect, useState } from 'react';

import axios from 'axios';


const Details = () => {


    const [reviewObj, setData] = useState([]);




    useEffect(() => {

        // Function to fetch data

        const fetchData = async () => {
            try {
                const response =  await axios.get('http://localhost:1337/api/coffee-reviews/' + "1");
                setData(response.data);
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };



        fetchData();

    }, []);


    //trying to stringify data before displaying it and then just rendering data in the component's return statement will break the program.
    //instad we createt a new constant and render that. 
     const review = JSON.stringify(reviewObj);
    //  console.log(review);
    //  console.log()

    return (

        <div className = 'singleReview'>
            
            <h1>Details page: {review}</h1>


        </div>

    );

};




export default Details;