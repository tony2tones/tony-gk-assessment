'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';
import { FirebaseError } from '../types/firebase';
import { InputField } from '../components/input-field';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('You have successfully logged in');
      router.push('/dashboard');
    } catch (err) {
      const firebaseErrors = err as FirebaseError
      toast.error(firebaseErrors.message);
    }
    setLoading(false);
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

          <div className='flex flex-col sm:flex-row gap-3 justify-between sm:gap-3 sm:justify-start'>
            <button type='submit' disabled={loading} >{loading ? 'Signing in...' : 'Sign in'}</button>
            <button type='button' disabled={loading} onClick={navToSignUp}>Need to signed up?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;