import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'

export default function MovieDetails() {

  const [itemDetails, setItemDetails] = useState({})
  const [similars, setSimilars] = useState([])
  let params = useParams();

  async function getDetails() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${params.type}/${params.id}?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US`)
    setItemDetails(data)

  }
  async function getSimilar() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${params.type}/${params.id}/similar?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&page=1`)
    setSimilars(data.results)
    console.log(data.results);

  }

  
  useEffect(() => {
    getDetails();
getSimilar();
  }, [])


  return <>
    <div className="row py-3">
      <div className="col-md-4">
        <img className='w-100' src={itemDetails.poster_path ? 'https://image.tmdb.org/t/p/w500' + itemDetails.poster_path : 'https://image.tmdb.org/t/p/w500' + itemDetails.profile_path} alt="" />
      </div>
      <div className="col-md-8">
      <h2>{itemDetails.title}{itemDetails.name}</h2>

      <p className='text-muted my-3'>{itemDetails.tagline}</p>
{/* <button>{itemDetails.genres}</button> */}
{itemDetails.genres===undefined?'':itemDetails.genres.map((el,index)=> <button key={index} className='btn btn-info mx-1'>{el.name}</button> )}
<p className='my-4'>vote : {itemDetails.vote_average}{itemDetails.popularity}</p>
<p className='my-4' >vote count : {itemDetails.vote_count}</p>
<p className='my-4'>budjet : {itemDetails.budget}</p>
<p >about:</p>
<p className='text-muted'>{itemDetails.overview}{itemDetails.biography}</p>

      </div>
    </div>






    <div className="row my-5">
      {similars.slice(0,10).map((mov,index)=><div key={index} className='col-md-2'>
  <Link to={'/movieDetails/'+mov.id+'/'+params.y}>
<div className="movie p-2 position-relative ">
  <img className='w-100' src={mov.poster_path?'https://image.tmdb.org/t/p/w500'+mov.poster_path:'https://image.tmdb.org/t/p/w500'+mov.profile_path} alt="" />
  <h3 className='h6 my-2'>{mov.title} {mov.name} </h3>
  <div className='vote text-center position-absolute top-0 end-0'>{mov.vote_average?.toFixed(1)} </div>
</div>
</Link>
   </div>
)}
    </div>
  </>
}




