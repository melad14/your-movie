import { createContext,useState } from "react";
import jwtDecode from 'jwt-decode';
import { Navigate } from "react-router-dom";

export let AuthContext =createContext('')

 export default function AuthContextProvider(props){

    const [userData, setUserData] = useState(null)
    function saveUserData(){
        let encodedToken= localStorage.getItem("userToken")
       let decodedToken= jwtDecode(encodedToken);
       setUserData(decodedToken)
       }

          
function logOut() {
    localStorage.removeItem('userToken')
    setUserData(null)
    return <Navigate to='/login' />
  }
  

return <AuthContext.Provider value={{userData,setUserData,saveUserData,logOut}} >

    {props.children}
</AuthContext.Provider>

}