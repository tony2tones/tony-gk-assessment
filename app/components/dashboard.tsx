'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import Image from 'next/image';
import profileImage from '@/public/profile.jpg'
import { auth } from '@/app/utils/firebaseConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/app/utils/firebaseConfig';
import { ArrowIcon } from './icons/arrow-icon';

const docRef = doc(db, "users", "tony");
const docSnap = await getDoc(docRef);

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/profile-management/${user?.uid}`)
  }

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/sign-in');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-white shadow-md">
      <div className='bg-slate-100 p-4 rounded-md'>
        <div className='flex gap-11'>
          <div>
            <h1 className="text-xl">User profile</h1>
            <p><strong>User ID:</strong> {user.uid}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div className='flex gap-3'>
            <p>Click on the image to update your profile </p> 
            <ArrowIcon />

            </div>
          </div>
          <div className='flex flex-col hover:border-2 border-sky-700 hover:bg-blue-500 hover:text-slate-100 transition-all duration-300' onClick={goToProfile} >
            <Image className='rounded-md hover:cursor-pointer' src={profileImage} width={230} height={300} alt='Profile figure' />
            <p className='font-bold pl-1 hover:cursor-pointer hover:bg-blue-500 text-slate-100'>Click to manage your profile?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
