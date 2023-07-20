// import useFetch from "../../../../hooks/useFetch";

let apiUrl = 'http://localhost:1337/api/coffee-reviews/'

// export const getStaticPaths = async () =>{
//     const response = await fetch('http://localhost:1337/api/coffee-reviews/?populate=*')
//     const data = await response.json();

//     const paths = data.data.map(review=>{
//         return{
//             params: {id: review.id.toString()}
//         }
//     })

//     return {
//         paths: paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) =>{
//     const id = context.params.id;
//     const response = await fetch(apiUrl+ '?populate=*')
//     const data = await response.json();

//     return {
//         props: {review: data}
//     }
// }

const Details = ({review}) =>{
    return(
        <div>
            <h1>Details page: </h1>
        </div>
    );
};

export default Details;

