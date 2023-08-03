import {createContext,useContext,useState, useEffect} from 'react';

const LogGoodContext = createContext();

export function useLogGood() {
    return useContext(LogGoodContext);
  }
  
  export function LogGoodProvider({ children }) {
    const [logGood, setLogGood] = useState(() => {
        // Get the value from local storage during initialization
        return JSON.parse(localStorage.getItem('logGood')) || false;
      });
      
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