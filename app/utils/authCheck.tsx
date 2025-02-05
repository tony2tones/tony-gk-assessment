import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/firebaseConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  return { user, loading };
};
