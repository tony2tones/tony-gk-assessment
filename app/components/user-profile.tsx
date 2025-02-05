"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import toast from "react-hot-toast";
import { User } from "../types/user";
import { useAuthRedirect } from "../utils/authCheck";
import { InputField } from "./input-field";

export default function ProfilePage() {
  const { user, loading } = useAuthRedirect();
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!slug || Array.isArray(slug) || !user) return;

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

          // Prevent users from accessing profiles that aren't theirs
          if (userSnap.id !== user?.uid) {
            toast.error("You are not authorized to view this profile.");
            router.replace("/dashboard");
          }
        } else {
          console.log("User not found");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      }
    }

    fetchUser();
  }, [slug, user, router]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const userRef = doc(db, "users", slug);
      await updateDoc(userRef, userData);
      toast.success("Your profile has been successfully updated!");
      setEditMode(false);
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
    <section className="h-96 flex flex-col items-center mt-10">
      <div>
        <h1>Welcome back, {userData?.fullName.split(" ")[0] || "Name"}</h1>
        {editMode ? (
          <div className="flex flex-col gap-4 w-96">
            <form onSubmit={handleSubmit}>
                <InputField
                label="Full name"
                  type="text"
                  name="fullName"
                  placeholder="please enter full name"
                  value={userData?.fullName || ''}
                  maxLength={150}
                  minLength={2}
                  required
                  onChange={(value: string) => setUserData((prev) => prev ? { ...prev, fullName: value } : prev)}
                />
              <br />
              <InputField
                label="Bio"
                  type="text"
                  name="bio"
                  placeholder="please enter full name"
                  value={userData?.bio || ''}
                  maxLength={150}
                  minLength={2}
                  required
                  onChange={(value: string) => setUserData((prev) => prev ? { ...prev, bio: value } : prev)}
                />
              <br />
              <button type="submit" className="w-full border-2">
                {loading ? "Loading please wait" : "Update details"}
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
