'use client'
import {Paper,Box, Typography} from '@mui/material/';
import Carousel from 'react-material-ui-carousel'
import imgs from '../../../components/imageUrls';
 import Link from 'next/link';
import useFetch from '../../../hooks/useFetch';
import { useState, useEffect } from 'react';

export default function Tester() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    const [reviewImages, setReviewImages] = useState([]);

    useEffect(() => {
        if (!loading && !error && data) {
            // Extracting images from reviews and setting them to state
            const images = data.data.map(review => {
                return `http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.medium.url}`;
            });
            setReviewImages(images);
        }
    }, [loading, error, data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error! Failed to fetch info from Strapi backend</p>;
    }

    function Example(props) {
        return (
            <Carousel sx={{ backgroundColor: 'black', color: 'black', borderRadius: '15px', height: '70%', width: '75%', margin: '0 auto' }}>
                {reviewImages.map((image, i) => (
                    <Item key={i} image={image} />
                ))}
            </Carousel>
        );
    }

    function Item(props) {
        return (
            <Paper sx={{ backgroundColor: 'black', marginTop: '20px', height: '60%' }}>
                <Box sx={{ width: '100%', height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: '0 auto' }}>
                    <img
                        src={props.image}
                        alt={`Review Image ${props.index}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </Box>
            </Paper>
        );
    }

    return (
        <div>
            <div className="carouselContainer">
                <Box sx={{ width: '80%', margin: '0 auto', height: '140%', '& .css-1m9128y': { marginTop: '30px' }, '& .MuiSvgIcon-root': {} }}>
                    <Example className="carousel" />
                </Box>
            </div>

        </div>
    );
}
