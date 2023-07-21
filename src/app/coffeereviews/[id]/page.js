'use client';


export const getStaticPaths = async () =>{
    const response = await fetch('http://localhost:1337/api/coffee-reviews');
    const data = response.json();

    //not too sure about the code from here to the end of the function
    //i know we are trying to collect all the review ids for paths
    //just not sure if this is executed correctly
    const paths = data.data.map(review=>{
        return{
            params: {id: review.id.toString()}
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}



export const getStaticProps = async (context) =>{

    const id = context.params.id;
    const response = await fetch('http://localhost:1337/api/coffee-reviews/' + id);
    let data =  response.json();

    //experimental line below, seems to have no effect
    // const reviewJSON = JSON.stringify(data);

    //unneccesarry line below? returns undefined for review either way
    data = data.data

    //should i be returning data.data instead??

    return {
        props: {review: reviewJSON}
    }
}







const Details = ({review}) =>{

    //currently prints undefined !
    console.log(review)

    return(
        <div>
            <h1>Details page: {review}</h1>
        
        </div>
    );
};

export default Details;

