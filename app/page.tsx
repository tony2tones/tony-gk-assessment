'use client'

import { useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth";
import { auth } from './utils/firebaseConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/app/utils/firebaseConfig';

const docRef = doc(db, "users", "tony");
const docSnap = await getDoc(docRef);

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  

  useEffect(() => {
    if(!user && !loading) {
      router.replace('/sign-in');
    }
  },[user, loading, router]);

  if(loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="w-full flex justify-center ">
    <div className="m-3 bg-gray-500 p-4">
        <button onClick={() => signOut(auth)} className="bg-red-500 px-4 py-2 text-white">Logout</button>
        <div className="bg-slate-400">
        <h1 className="text-xl">Dashboard</h1>
        <p><strong>User ID:</strong> {user.uid}</p>
        <p><strong>Name:</strong> {user.displayName ? user.displayName : 'no name'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        </div>
        <Link href={`/profile-management/${user.uid}`} className="text-blue-300">View Profile</Link>
      </div>
    </div>
  );
}

export default Dashboard;
