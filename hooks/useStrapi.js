import axios from 'axios';

const useStrapi = () =>{
    const apiURL = 'http://localhost:1337';

    //otherProps, the second argument we're receiving from registration page's res variable, is used to access the api method and data 
    const fetchAPI = async (path, otherProps) => {
//right now i'm passing in a POST method , so this is for registering accounts in that case. I amy be able to reuse this by passing in non post otherProps.methods and otherProps.data
        let config = {
            method: otherProps.method,
            maxBodyLength: Infinity,
            url: `${apiURL}${path}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : otherProps.data
          };

        const response = await axios.request(config);
        return response;
     

    };



    return {fetchAPI}
};

export default useStrapi;