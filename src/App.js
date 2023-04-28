import './App.css';
import Layout from './Components/Layout/Layout';
import { createHashRouter, Navigate, RouterProvider}from 'react-router-dom'
import Home from './Components/Home/Home';
import Tv from './Components/Tv/Tv';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Regester from './Components/Regester/Regester';
import Notfound from './Components/Notfound/Notfound.jsx';
import jwtDecode from 'jwt-decode';
import React ,{ useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { AuthContext } from './Components/Context/AuthContext';
import InverseProtectedRoute from './Components/InverseProtectedRouter/InverseProtectedRoute.jsx';



function App() {
  
  let{userData,setUserData}=useContext(AuthContext)


useEffect(() => {
  if (localStorage.getItem('userToken') !== null) {

    saveUserData();

  }

}, [])


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

  const routers=createHashRouter([
  {path:'/',element:<Layout logOut={logOut} userData={userData}/>,children:[
    {index:true,element:<ProtectedRoute saveUserData={saveUserData}  userData={userData} > <Home/> </ProtectedRoute> },
    {path:'movies',element:<ProtectedRoute saveUserData={saveUserData} userData={userData} > <Movies/> </ProtectedRoute>},
    {path:'people',element:<ProtectedRoute saveUserData={saveUserData} userData={userData} > <People/> </ProtectedRoute>},
    {path:'tv',element:<ProtectedRoute saveUserData={saveUserData} userData={userData} > <Tv/> </ProtectedRoute>},
    {path:'moviedetails/:id/:type',element:<ProtectedRoute saveUserData={saveUserData} userData={userData} > <MovieDetails/> </ProtectedRoute>},
    {path:'login',element: <InverseProtectedRoute><Login saveUserData={saveUserData}/>  </InverseProtectedRoute> },
    {path:'regester',element:<InverseProtectedRoute> <Regester/> </InverseProtectedRoute>},
    {path:'*',element:<ProtectedRoute> <Notfound/> </ProtectedRoute>},
  ]}
])



  return<>

  <RouterProvider router={routers}/>
</>
}

export default App;
