"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import toast from "react-hot-toast";
import { User } from "../constants/user";
import {  Loader2 } from "lucide-react";


export default function ProfilePage() {
  const { slug } = useParams() as { slug: string };
  const [userData, setUserData] = useState<User | null>(null);
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
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [slug]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const userRef = doc(db, "users", slug);
      await updateDoc(userRef, userData);
      toast.success("Your profile has been successfully updated!");
      setEditMode(false);

    } catch (error) {
      toast.error(`An error has occurred updated! ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <section className="h-96 flex flex-col items-center mt-10 ">
      <div >
      <h1>Welcome back, {userData?.fullName.split(" ")[0] || 'Name'}</h1>
      {editMode ? (
        <div className="flex flex-col gap-4 w-96">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={userData?.fullName}
                maxLength={150}
                required
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="flex flex-col">
              <label>Bio:</label>
              <input
                type="text"
                name="bio"
                value={userData?.bio}
                maxLength={200}
                required
                onChange={handleChange}
              />
            </div>
            <br />
            <button type="submit" className="w-full border-2">
              {loading ? 'Loading please wait': 'Update details'}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-96">
          <p>Name: {userData?.fullName}</p>
          <p>Bio: {userData?.bio}</p>
          <button onClick={toggleEditMode}>Update details?</button>
        </div>
      )}
      </div>
    </section>
  );
}
