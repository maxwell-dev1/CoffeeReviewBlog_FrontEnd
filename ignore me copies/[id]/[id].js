import React from 'react';
import useFetch from '../../hooks/useFetch';


const ReviewPage = ({review}) =>{
    return(
        <div>
          <img
            src={`http://localhost:1337${review.attributes.ProductImage.data[0].attributes.formats.small.url}`}
            alt={`Image for Review ${review.id}`}
            />
            <h3>Rating: {review.attributes.Rating}</h3>
            <p>Details: {review.attributes.Body}</p>  
        </div>
    );
};

export function getStaticPaths(){
    const {data} =  useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
    // collect all the review ID's:
    const reviewIDs = [];
    reviewIDs= data.data.map((review)=>review.id);
    console.log(reviewIDs);
    console.log(review);
    //generate paths for each review:
    const paths = reviewIDs.map((id)=>({ params: {id: id.toString()} }));

    return {paths, fallback: false};
}

export function getStaticProps({params}){
    const {data} = useFetch (`http://localhost:1337/api/coffee-reviews/${params.id}?populate=*`);
    const review = data.data[0];

    return{
        props: {review},
        revalidate: 1,
    };
}



export default ReviewPage;