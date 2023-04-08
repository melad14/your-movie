import React from 'react'
import { Link } from 'react-router-dom';

export default function MediaItem({mov}) {
  return <>
 
  <div  className='col-md-2'>
     <Link to={"/moviedetails/"+mov.id+'/'+mov.media_type}>
<div className="movie p-2 position-relative ">
  <img className='w-100' src={mov.poster_path?'https://image.tmdb.org/t/p/w500'+mov.poster_path:'https://image.tmdb.org/t/p/w500'+mov.profile_path} alt="" />
  <h3 className='h6 my-2'>{mov.title} {mov.name} </h3>
  <div className='vote text-center position-absolute top-0 end-0'>{mov.vote_average?.toFixed(1)} </div>
</div>
  </Link>
   </div>

 
  </>
}
