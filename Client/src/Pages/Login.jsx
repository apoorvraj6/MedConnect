import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {backendUrl,token,setToken} = useContext(AppContext);
  const navigate = useNavigate()

  const [state,setState] = useState("Sign Up")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")


  const onSubmitHandeler = async (e) =>{
    e.preventDefault();

    try {
      if(state === "Sign Up")
      {
        const {data} = await axios.post(backendUrl +'/api/user/register-user',{name,password,email});
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post(backendUrl+'/api/user/login-user',{email,password});
        if(data.success)
        {
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandeler}>

      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>

        <p>Please {state === 'Sign Up' ? "Sign Up" : "Sign In"} to book appointment</p>
       
        {
          state === "Sign Up" &&  <div className='w-full'>
          <p>Full Name</p>
          <input type="text" className='border border-zinc-300 rounded w-full p2 mt-1' onChange={(e)=>setName(e.target.value)} value={name} required/>
        </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input type="email" className='border border-zinc-300 rounded w-full p2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {state === "Sign Up" ? 
        <p>Already have an account? <span  className='text-primary underline cursor-pointer'  onClick={()=>setState('Login')}>Login here</span></p> :
        <p>Create a new account? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Sign Up')}>click here</span></p>}
      </div>
      
    </form>
  )
}

export default Login
