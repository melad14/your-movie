import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loding.jsx'




export default function Movies() {

  let pageNumber = new Array(10).fill('*').map((el, i) => i + 1)

  const [category, setCategory] = useState('popular')
  const [moviesList, setMoviesList] = useState([])
  const [loading, setLoading] = useState(true)


  async function getMovie(pageNum = 1, type = 'popular') {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&page=${pageNum}`)
    setMoviesList(data.results)
    setLoading(false)
  }

  function changePageNum(i) {

    getMovie(i, category)
  }
  function getType(e) {

    let type = e.target.id
    getMovie(1, type)
    setCategory(type)
  }

  async function search(e) {
    let value = e.target.value

    if (value != '') {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&query=${value}&page=1&include_adult=false`)

      setMoviesList(data.results)
    }
    else {
      getMovie();
    }
  }
  useEffect(() => {

    getMovie();

  }, [])




  return <>
    {loading === true ? <Loading /> : null}

    <input onChange={search} type="text" className='form-control bg-transparent w-75 mx-auto text-white  ' placeholder='search here' />

    <div className='row my-5'>

      <div className="col-md-2 listaaa h-25">
        <p onClick={getType} id='popular'>popular</p>
        <p onClick={getType} id='top_rated'>top rated</p>
        <p onClick={getType} id='upcoming'>upcoming</p>
        <p onClick={getType} id='now_playing'>now playing</p>

      </div>
     
      <div className="col-md-10">
        <div className="row">
      {moviesList.map((mov, index) => <div key={index} className='col-md-2'>
        <Link to={'/movieDetails/' + mov.id + '/movie'}>
          <div className="movie p-2 position-relative ">
            <img className='w-100' src={mov.poster_path ? 'https://image.tmdb.org/t/p/w500' + mov.poster_path : 'https://image.tmdb.org/t/p/w500' + mov.profile_path} alt="" />
            <div className='vote text-center position-absolute top-0 end-0'>{mov.vote_average?.toFixed(1)} </div>
            <div className=" overlay  d-flex align-items-center justify-content-center">
              <p>Go To  Details</p>
            </div>
          </div>
          <h3 className='h6 my-2'>{mov.title} {mov.name} </h3>
        </Link>
      </div>)}

    </div>
    </div>
    </div>









    <nav aria-label="..." className='d-flex  justify-content-center my-5'>
      <ul className="pagination pagination-lg">

        {pageNumber.map((el, index) => <li key={index} onClick={() => changePageNum(el)} className="page-item " aria-current="page">
          <span className="page-link">{el}</span>
        </li>)}
      </ul>
    </nav>
  </>
}
