'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/firebaseConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileWidget from './profile-widget';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/sign-in');
    }
  }, [user, loading, router]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">No data found</div>
  }

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-white shadow-md">
      <div className='bg-slate-100 p-4 rounded-md'>
        <ProfileWidget uid={user.uid} email={user.email} />
      </div>
    </div>
  );
}

export default Dashboard;
