import { useEffect,useState } from "react";

const useFetch = (url) =>{
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            try{
                const result = await fetch(url);
                const json = await result.json();
                console.log(json);
                setData(json)
                setLoading(false)
            }
            catch(error){
                setError(error)
                setLoading(false)
            }                   
        }

        fetchData()
        //line below passing dependencies?
    },[url])
    return {loading, error, data}
}


export default useFetch;