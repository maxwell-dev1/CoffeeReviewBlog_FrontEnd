import {createContext, useState, useContext, useEffect} from 'react';

const UserContext= createContext();

export function useUserContext(){
    return useContext(UserContext);
}

export function UserContextProvider({children}){
    const [activeUser, setActiveUser] = useState(() => {
        // Get the value from local storage during initialization
        return JSON.parse(localStorage.getItem('activeUser')) || "";
      });
      
      useEffect(() => {
        // Store the updated value in local storage whenever logGood changes
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
      }, [activeUser]);

    return(
        <UserContext.Provider value={{activeUser,setActiveUser}}>
            {children}
        </UserContext.Provider>
    )
}