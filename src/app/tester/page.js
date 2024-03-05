'use client';
import useFetch from '../../../hooks/useFetch';


export default function Tester() {
    const {loading, error, data} = useFetch('http://localhost:1337/api/coffee-reviews/?populate=*');
  

    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error!...Failed to fetch info from Strapi back end</p>
    }


    return (
        <div>
            <h2>Cofee reviews: </h2>
            {/* {data.data.map(review => (
                <div key={review.id} className='review-card'>
                 <h1>{review.attributes.Title}</h1>
                 </div>
                 ))} */}
                 {data.data[0].attributes.Title}
        </div>
    );
}
