'use client';
import { useAuthRedirect } from '../utils/authCheck';
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, loading } = useAuthRedirect();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  function navToDashboard() {
    router.push('/dashboard');
  }

  useEffect(() => {
    setHydrated(true);
    if (!user && !loading) {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  if (!hydrated) return null; // Prevents SSR from rendering inconsistent UI

  return (
    <nav className="w-full bg-white text-black transition h-12 flex items-center px-5 pt-5 0">
      <div className="flex justify-between items-center w-full">
      <button
              onClick={() => navToDashboard()}
              className="text-xl font-semibold tracking-wide  text-slate-900 hover:bg-slate-900 transition"
            >
          Dashboard
        </button>
        {user && (
          <div className="flex items-center gap-8">
            <button
              onClick={() => signOut(auth)}
              className="text-xl font-semibold tracking-wide  text-slate-900 hover:bg-slate-900 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
