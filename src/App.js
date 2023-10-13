import './App.css';
import Layout from './Components/Layout/Layout';
import { BrowserRouter, createHashRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './Components/Home/Home';
import Tv from './Components/Tv/Tv';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Regester from './Components/Regester/Regester';
import Notfound from './Components/Notfound/Notfound.jsx';
import React, { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { AuthContext } from './Components/Context/AuthContext';
import InverseProtectedRoute from './Components/InverseProtectedRouter/InverseProtectedRoute.jsx';

function App() {
  let { saveUserData } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path='your-movie' element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="people" element={<ProtectedRoute><People /></ProtectedRoute>} />
          <Route path="tv" element={<ProtectedRoute ><Tv /></ProtectedRoute>} />
          <Route path="moviedetails/:id/:type" element={<ProtectedRoute ><MovieDetails /></ProtectedRoute>} />
          <Route path="login" element={<InverseProtectedRoute><Login /></InverseProtectedRoute>} />
          <Route path="regester" element={<InverseProtectedRoute><Regester /></InverseProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><Notfound /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
