'use client';
import { Box, Paper } from '@mui/material/';
import Carousel from 'react-material-ui-carousel';
import useFetch from '../../../hooks/useFetch';
import { useState, useEffect } from 'react';

export default function Tester2() {

    const { loading, error, data } = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const [reviewImages, setReviewImages] = useState([]);
    const [reviewLinks, setReviewLinks] = useState([])

    useEffect(() => {
        if (!loading && !error && data) {
            const images = data.data.map(review => `http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.medium.url}`);
            setReviewImages(images);
            
            const links = data.data.map(review => `http://localhost:3000/coffeereviews/${review.id}`)
            setReviewLinks(links);


        }
    }, [loading, error, data]);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error! Failed to fetch info from Strapi backend</p>;
    }



    return (
        <div className="carouselContainer">
            <Box sx={{ width: '80%', margin: '0 auto', height: '140%', '& .css-1m9128y': { marginTop: '30px' } }}>
                <Carousel sx={{ backgroundColor: 'black', color: 'black', borderRadius: '15px', height: '70%', width: '75%', margin: '0 auto' }}>
                    {reviewImages.map((image, i) => (
                        <Paper key={i} sx={{ backgroundColor: 'black', marginTop: '20px', height: '60%' }}>
                            <Box sx={{ width: '100%', height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: '0 auto' }}>
                                <a href={reviewLinks[i]}><img
                                    src={image}
                                    alt={`Review Image ${i}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%',borderRadius:10 }}
                                /></a>
                            </Box>
                        </Paper>
                    ))}
                </Carousel>
            </Box>
        </div>
    );
}
