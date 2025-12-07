import {createContext,useContext,useState, useEffect} from 'react';

const LogGoodContext = createContext();

export function useLogGood() {
    return useContext(LogGoodContext);
  }
  
  export function LogGoodProvider({ children }) {
    const [logGood, setLogGood] = useState(false);
    
    useEffect(()=>{
      const loginStored  = localStorage.getItem('logGood')
      if(loginStored !== null)
        setLogGood(JSON.parse(loginStored))
    },[])
      
    useEffect(() => {
      // Store the updated value in local storage whenever logGood changes
      localStorage.setItem('logGood', JSON.stringify(logGood));
    }, [logGood]);


  
    return (
      <LogGoodContext.Provider value={{ logGood, setLogGood }}>
        {children}
      </LogGoodContext.Provider>
    );
  }