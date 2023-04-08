import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function People() {
  let pageNumber = new Array(10).fill('*').map((el, i) => i + 1)

  const [category, setCategory] = useState('popular')
  const [peopleList, setPeopleList] = useState([])

  async function getPeople(pageNum = 1, type ='popular') {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/${type}?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&page=${pageNum}`)
    setPeopleList(data.results)
  }

  function changePageNum(i) {

    getPeople(i, category)
  }
  function getType(e) {

    let type = e.target.id
    getPeople(1, type)
    setCategory(type)
  }

  async function search(e) {
    let value = e.target.value

    if (value != '') {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=2acf94cbe57ef067709c1573363ddb3c&language=en-US&query=${value}&page=1&include_adult=false`)

      setPeopleList(data.results)
    }
    else {
      getPeople();
    }
  }
  useEffect(() => {

    getPeople();

  }, [])




  return <>
    <input onChange={search} type="text" className='form-control bg-transparent w-75 mx-auto text-white  ' placeholder='search here' />

    <div className='row my-5'>
  

          {peopleList.map((person, index) => <div key={index} className='col-md-2'>
            <Link to={'/movieDetails/' + person.id + '/person'}>
              <div className="movie p-2 position-relative ">
                <img className='w-100' src={person.poster_path ? 'https://image.tmdb.org/t/p/w500' + person.poster_path : 'https://image.tmdb.org/t/p/w500' + person.profile_path} alt="" />
                <h3 className='h6 my-2'>{person.title} {person.name} </h3>
                <div className='vote text-center position-absolute top-0 end-0'>{person.vote_average?.toFixed(1)} </div>
              </div>
            </Link>
          </div>)}
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
