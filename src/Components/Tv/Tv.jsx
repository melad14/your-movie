import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loding.jsx'

export default function Tv() {
  let pageNumber = new Array(10).fill('*').map((el, i) => i + 1)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('popular')
  const [tvList, setTvList] = useState([])

  async function getTv(pageNum = 1, type = 'popular') {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${type}?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&page=${pageNum}`)
    setTvList(data.results)
    setLoading(false)
  }

  function changePageNum(i) {

    getTv(i, category)
  }
  function getType(e) {

    let type = e.target.id
    getTv(1, type)
    setCategory(type)
  }

  async function search(e) {
    let value = e.target.value

    if (value != '') {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&query=${value}&page=1&include_adult=false`)

      setTvList(data.results)
    }
    else {
      getTv();
    }
  }
  useEffect(() => {

    getTv();

  }, [])




  return <>
    {loading === true ? <Loading /> : null}
    <input onChange={search} type="text" className='form-control bg-transparent w-75 mx-auto text-white  ' placeholder='search here' />

    <div className='row my-5'>
      <div className="col-md-2 listaaa h-25">
        <p onClick={getType} id='popular'>popular</p>
        <p onClick={getType} id='top_rated'>top rated</p>
        <p onClick={getType} id='airing_today'>Airing Today</p>
        <p onClick={getType} id='on_the_air'>on the air</p>

      </div>
      <div className="col-md-10">
        <div className="row">

          {tvList.map((tv, index) => <div key={index} className='col-md-2'>
            <Link to={'/movieDetails/' + tv.id + '/tv'}>
              <div className="movie p-2 position-relative ">
                <img className='w-100' src={tv.poster_path ? 'https://image.tmdb.org/t/p/w500' + tv.poster_path : 'https://image.tmdb.org/t/p/w500' + tv.profile_path} alt="" />
                <div className='vote text-center position-absolute top-0 end-0'>{tv.vote_average?.toFixed(1)} </div>
                <div className=" overlay  d-flex align-items-center justify-content-center">
                  <p>Go To  Details</p>
                </div>
              </div>
              <h3 className='h6 my-2'>{tv.title} {tv.name} </h3>
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
