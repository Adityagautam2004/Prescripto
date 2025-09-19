import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Login = () => {

  const {backendURL,token, setToken} = useContext(AppContext);
  const [state, setState] = useState('Sign Up')
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      if(state === 'Sign Up'){
        const {data} = await axios.post(`${backendURL}/api/user/register`,{
          name,
          email,
          password
        })
        if(data.success){
          toast.success(data.message);
          localStorage.setItem('token',data.token)
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }else{
        const {data} = await axios.post(`${backendURL}/api/user/login`,{
          email,
          password
        })
        if(data.success){
          toast.success(data.message);
          localStorage.setItem('token',data.token)
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }
    }
    catch(error){
      console.log(error);
      if(error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Connection error. Please try again later.");
      }
    }
  }
  useEffect(() => {
    if(token){
      navigate('/');
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Welcome back'}</p>
        <p>Please  {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment</p>
        {
          state === 'Sign Up' && (
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full cursor-pointer rounded-md py-2 text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up' ? <p className='mt-4'>Already have an account? <span className='text-primary cursor-pointer' onClick={() => setState('Login')}>Login here</span></p> : <p className='mt-4'>Don't have an account? <span className='text-primary cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
        }
      </div>
       
    </form>
  )
}

export default Login