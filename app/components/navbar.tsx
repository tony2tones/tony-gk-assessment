'use client'
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
      if(!user && !loading) {
        router.replace('/sign-in');
      } 

    },[user, loading, router]);


  return <nav className="p-10 pt-4 bg-zinc-100 py-2 border-b justify-between border-zinc-200 w-full fixed h-16 pr-0">
  <div className="flex items-center justify-between w-full px-0">
    <div className="flex gap-11 text-sm font-medium">
        <Link href={'/dashboard'}>Dashboard</Link>
        <Link href={`/profile-management/${user?.uid}`}>Manage profile</Link>
      </div>
      </div>
      </nav>
}