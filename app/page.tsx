'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './utils/firebaseConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/app/utils/firebaseConfig';
import { Link } from 'lucide-react';

const docRef = doc(db, "users", "tony");
const docSnap = await getDoc(docRef);

const Landing = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }


  useEffect(() => {
    if (!user && !loading) {
      router.replace('/sign-in');
    }
  }, [user, loading, router]);


  return (
    <div className="w-full flex justify-center ">
      <Link href='/sign-up' >Go to log in page</Link>
    </div>
  );
}

export default Landing;
