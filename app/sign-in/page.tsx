'use client'

import {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';
import {login, register} from '../utils/firebaseConfig';

type FirebaseError = {
  code: number;
  message: string;
  errors?: {
    message: string;
    domain: string;
    reason: string;
  }[];
};

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const onSubmit = async (e:FormEvent) => {
  e.preventDefault();
  try {
    await login(email, password);
    router.push('/dashboard');
  } catch (err) {
    const firebaseErrors = err as FirebaseError
    console.log(firebaseErrors.message)
    setErrorMessage(firebaseErrors.message)
  }
}

const navToSignUp =() => {
  router.push('/sign-up')
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
    <div className='flex flex-col gap-1 border '>
    <h1>Sign In</h1>
    <form onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input
          type='email'
          placeholder='Please enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-3 mb-4 bg-slate-100 rounded outline-none text-slate-950 placeholder-gray-500'
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          placeholder='Please enter email'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-3 mb-4 bg-slate-100 rounded outline-none text-slate-950 placeholder-gray-500'
          />
          {errorMessage && <p className='text-red-700 font-semibold'>{errorMessage}</p>}
          <div className='flex justify-between'>
      <button type='submit' className='bg-sky-400'>Sign in</button>
        <button type='button' onClick={navToSignUp}>Need to signed up?</button>
        </div>
        </div>
      </form>
        </div>
    </div>
  )
}

export default SignIn;