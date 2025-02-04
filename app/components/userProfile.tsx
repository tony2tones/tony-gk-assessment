
"use client"; 

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";

type User = {
  ud:string,
  fullName:string,
  email:string,
  bio:string,
}

export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || Array.isArray(slug)) return; 
  
    async function fetchUser() {
      try {
        const userRef = doc(db, "users", slug as string); 
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          console.log('THE SNAP', userSnap)
          setUser({ id: userSnap.id, ...userSnap.data() });
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchUser();
  }, [slug]);
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {user ? (
        <div>
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
          <button>Update details?</button>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
