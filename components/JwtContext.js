import { createContext,useContext,useState,useEffect } from "react";

const JwtContext = createContext('');

export function useJwtContext(){
    return useContext(JwtContext);
}



export function JwtContextProvider({children}){
    const [jwt, setJwt] = useState(()=>{
        return JSON.parse(localStorage.getItem('jwt')) || "";
    });


    useEffect(()=>{
        localStorage.setItem('jwt', JSON.stringify(jwt))
    },[jwt])

    return (
        <JwtContext.Provider value = {{jwt,setJwt}}>
            {children}
        </JwtContext.Provider>
    );
}
