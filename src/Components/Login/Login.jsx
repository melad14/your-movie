import React, { useContext, useState } from 'react'
import Axios from 'axios'
import joi from 'joi'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext.jsx'


export default function Login() {
let {saveUserData}=useContext(AuthContext)
  let navigate=useNavigate()
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
   email:'',
    password:''
  });
  
  function getUserData(e){
    const myUser={...user}
    myUser[e.target.name]=e.target.value
    setUser(myUser)
  }
  async function sendUserData(){
    await Axios.post(`https://users-api-ashy.vercel.app/signin`,user).then((data)=>{
   navigate('/')
      setLoading(false)
         localStorage.setItem('userToken',data.data.token)
         saveUserData()
    })
    .catch((err)=>{
      
      setLoading(false)
      setError(err.response.data.error)
    })
 
    } 
  
  
  function submitLogin(e){
    e.preventDefault()
    setLoading(true)
   
   let validation= validationLog()
   if(validation.error){
    setLoading(false)
  setErrorList(validation.error.details)
   }
   else{
   sendUserData() 
   }
  }
  
  function validationLog(){  
    
    let scheme= joi.object({
   email:joi.string().email({tlds:{allow:['com','net']}}).required(),
   password:joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
   
     })
   
     return scheme.validate(user,{abortEarly:false})  //return >>>  variable علشان هستلمها ف
   
   }
   
  
    return <div className="w-75 mx-auto py-3 ">
  
      <h3 className="my-4">Login form</h3>
  
     { error? <p className='text-danger '>{error}</p>:'' } 
    
  
      <form onSubmit={submitLogin}>
  
 
  <label htmlFor="email ">email : </label>
        <input onChange={getUserData} type="email" className='form-control myInput mb-2 my-2 ' name='email' id='email'  />
        <p className='text-danger'>{errorList.filter((error)=>error.context.label==='email')[0]?.message}</p>
  <label htmlFor="password ">password : </label>
        <input  onChange={getUserData} type="password" className='form-control myInput mb-2 my-2 ' name='password' id='password'  />
        <p className='text-danger'>{errorList.filter((error)=>error.context.label==='password')[0]?.message}</p>
   
     <button type='submit' className="btn btn-info my-2 ">
       {loading? <i className='fas fa-spinner fa-spin'></i>:'Login'}
       </button>
      
      
      </form>
    </div>
}
