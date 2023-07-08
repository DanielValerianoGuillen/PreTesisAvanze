import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const UserContext = createContext({})


const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [ready,setReady] = useState(false)
    useEffect(()=>{

        const fetchData = async () => {
            try {
              const { data } = await axios.get('/profile');
              setUser(data);
              setReady(true)
            } catch (error) {
              console.log(error);
            }
          };
        if(!user){
            fetchData();
        }
        
    },[])
    return ( 
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
         );
}
 
export default UserContextProvider;