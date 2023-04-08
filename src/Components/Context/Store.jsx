import { createContext,useState,useEffect } from "react";
import  Axios  from 'axios';

export let MediaContext=createContext('')

export default  function MediaContextProvider(props){

    const [trendingMovie, settrendingMovie] = useState([])
    const [trendingTv, settrendingTv] = useState([])
    const [trendingPerson, settrendingPerson] = useState([])
    
    
    
     async function getTrend(mediaType,func){
    let{data}= await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=2acf94cbe57ef067709c1573363ddb3c`)
    
    func(data.results)
    }
    
    useEffect(() => {
      
    getTrend('movie',settrendingMovie)
    getTrend('tv',settrendingTv)
    getTrend('person',settrendingPerson)
     
    }, [])
  
  


return <MediaContext.Provider value={{trendingMovie,trendingPerson,trendingTv}}>

{props.children}

</MediaContext.Provider>

 }
