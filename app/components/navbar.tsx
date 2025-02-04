'use client';
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!user && !loading) {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  if (!hydrated) return null; // Prevents SSR from rendering inconsistent UI

  return (
    <nav className="w-full bg-white text-black shadow-md hover:shadow-lg transition h-14 flex items-center px-6 border-b border-gray-300">
      <div className="flex justify-between items-center w-full">
        <Link href="/dashboard" className="text-xl font-semibold tracking-wide text-slate-900 hover:bg-gray-200 transition">
          Dashboard
        </Link>
        {user && (
          <div className="flex items-center gap-8">
            <button
              onClick={() => signOut(auth)}
              className="bg-white border border-black text-black hover:bg-gray-200 px-4 py-1 rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
