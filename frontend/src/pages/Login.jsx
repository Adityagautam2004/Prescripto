import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler =async (e) =>{
    e.preventDefault();

    
  }

  return (
    <form className='min-h-[80vh] flex items-center' action="">
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
        <button className='bg-primary text-white w-full rounded-md py-2 text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up' ? <p className='mt-4'>Already have an account? <span className='text-primary cursor-pointer' onClick={() => setState('Login')}>Login here</span></p> : <p className='mt-4'>Don't have an account? <span className='text-primary cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
        }
      </div>
       
    </form>
  )
}

export default Login