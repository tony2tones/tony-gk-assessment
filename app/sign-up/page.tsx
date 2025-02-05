'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../utils/firebaseConfig';
import { InputField } from '../components/input-field';
import { FirebaseError } from '../types/firebase';
import toast from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('register');
    try {
      await register(email, password);
      router.push('/dashboard');
      toast.success('You have successfully logged in');
    } catch (err) {
      const firebaseErrors = err as FirebaseError
      console.log(firebaseErrors.message)
      setErrorMessage(firebaseErrors.message)
      toast.error(firebaseErrors.message);
    }
  }

  const navToSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='flex flex-col gap-1 border '>
        <h1>Sign up</h1>
        <form onSubmit={onSubmit}>
          <InputField
            name='email'
            type='email'
            label='Email'
            placeholder='Please enter email'
            onChange={setEmail}
            required={true}
            value={email}
          />
          <InputField
            name='password'
            type='password'
            label='Password'
            placeholder='Please enter password'
            onChange={setPassword}
            required={true}
            value={password}
          />
          {errorMessage && <p className='text-red-700 font-semibold'>{errorMessage}</p>}
          <div className='flex justify-between'>
            <button type='submit' >Sign up</button>
            <button type='button' onClick={navToSignIn}>Already signed up?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;