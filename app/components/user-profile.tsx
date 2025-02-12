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
  const { user, loading: authLoading } = useAuthRedirect();
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);

   // Local loading states
   const [profileLoading, setProfileLoading] = useState(true);
   const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!slug || Array.isArray(slug) || !user) return;

    async function fetchUser() {
      setProfileLoading(true);
      try {
        const userRef = doc(db, "users", slug);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const fetchedUser: User = {
            id: userSnap.id,
            fullName: userData.fullName || "",
            email: userData.email || "",
            bio: userData.bio || "",
          };

          // Prevent users from accessing profiles that aren't theirs
          if (userSnap.id !== user?.uid) {
            toast.error("You are not authorized to view this profile.");
            router.push("/dashboard");
            return;
          }
          setUserData(fetchedUser);
        } else {
          setUserData(null);
          toast.error(`No user data found.`);
        }
      } catch (error) {
        toast.error(`Additional error information ${error}.`);
        setUserData(null);
      }finally {
        setProfileLoading(false)
      }
    }

    fetchUser();
  }, [slug, user, router]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    setUpdateLoading(true);
    try {
      const userRef = doc(db, "users", slug);
      await updateDoc(userRef, userData);
      toast.success("Your profile has been successfully updated!");
      setEditMode(false);
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    } finally {
      setUpdateLoading(false)
    }
  };

  // Show a loader until both auth and profile data are loaded.
  if (authLoading || profileLoading) {
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
    <section className="min-h-screen flex flex-col items-center mt-10 p-4">
    <div className="w-full max-w-lg bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {userData.fullName.split(" ")[0] || "Name"}
      </h1>
        {editMode ? (
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="please enter bio"
                  value={userData?.bio || ''}
                  maxLength={150}
                  minLength={2}
                  required
                  onChange={(value: string) => setUserData((prev) => prev ? { ...prev, bio: value } : prev)}
                />
              <br />
              <button type="submit" className="w-full border-2 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={updateLoading}
              >
              {updateLoading ? "Updating..." : "Update details"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p>Name: {userData?.fullName}</p>
            <p>Bio: {userData?.bio}</p>
            <button
              onClick={toggleEditMode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >Update details?
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
