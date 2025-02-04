
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import toast from "react-hot-toast";

type User = {
  id: string;
  fullName: string;
  email: string;
  bio: string;
};

export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };
  const [userData, setUserData] = useState<User>({ fullName: '', email: '', bio: '', id: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!slug || Array.isArray(slug)) return;

    async function fetchUser() {
      try {
        const userRef = doc(db, "users", slug);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          setUserData({
            id: userSnap.id,
            fullName: userData.fullName || "",
            email: userData.email || "",
            bio: userData.bio || "",
          });
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

  const toggleEditMode = () => {
    setEditMode((prev) => prev = !editMode);
  }

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", slug);
      await updateDoc(userRef, userData);
      setUserData(userData);
      setEditMode(false)
      toast.success('Your profile has been successfully update!');
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-200">
      <h1>Welcome back {userData.fullName.split(' ')[0]}</h1>

      {userData && editMode ? (
        <div className="flex flex-col gap-4 w-96">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                maxLength={150}
                required
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="flex flex-col">
              <label>
                Bio:
              </label>
              <input
                type="text"
                name="bio"
                value={userData.bio}
                maxLength={200}
                required
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="submit" className="w-full">Update details</button>
          </form>
        </div>
      ) :
        userData && !editMode ? (
          <div className="flex flex-col gap-4 w-96">
            <p>Name: {userData.fullName}</p>
            <p>Bio: {userData.bio}</p>
            <button onClick={toggleEditMode}>Update details?</button>
          </div>
        ) : (
          <p>User not found</p>
        )}
    </div>
  );
}
