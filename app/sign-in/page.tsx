'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';
import { FirebaseError } from '../constants/firebase';
import { InputField } from '../components/input-field';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('You have successfully logged in');
      router.push('/dashboard');
    } catch (err) {
      const firebaseErrors = err as FirebaseError
      toast.error(firebaseErrors.message);
    }
  }

  const navToSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='flex flex-col gap-1 border '>
        <h1>Sign In</h1>
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
          
          <div>
            <div className='flex justify-between'>
              <button type='submit' >Sign in</button>
              <button type='button' onClick={navToSignUp}>Need to signed up?</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;