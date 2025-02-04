'use client'

import { useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/firebaseConfig';
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
    
        <div className="bg-slate-400 p-7">
        <h1 className="text-xl">Dashboard</h1>
        <p><strong>User ID:</strong> {user.uid}</p>
        <p><strong>Name:</strong> {user.displayName ? user.displayName : 'no name'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <Link href={`/profile-management/${user.uid}`} className="text-blue-300">View Profile</Link>
        </div>
    
  );
}

export default Dashboard;
