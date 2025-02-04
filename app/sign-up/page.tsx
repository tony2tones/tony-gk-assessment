'use client'

import {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';
import {register} from '../utils/firebaseConfig';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
const onSubmit = async (e:FormEvent) => {
  e.preventDefault();
  console.log('register');
  try {
    await register(email, username, password);
    router.push('/');
  } catch (err) {
    console.log(err)
    // setErrorMessage(err.code);
  }
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='flex flex-col gap-3 border '>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            placeholder='Please enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500'
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            placeholder='Please enter email'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500'
          />
        <button type='submit'>Submit</button>
        </div>
      </form>
        </div>
    </div>
  )
}

export default SignUp;