import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth, provider, db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

const saveToSession = (user: any) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const sessionData = {
    user_id: user.uid,
    name: user.displayName,
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + oneDayInMs,
  };

  localStorage.setItem("userSession", JSON.stringify(sessionData));
};

const signInWithGoogle = async () => {
  try {
    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we log you in.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData = {
        user_id: user.uid,
        name: user.displayName,
        email: user.email,
        role: false,
        isGmail: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, userData);
    }

    saveToSession(user);

    return user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "An error occurred during Google sign-in.",
      footer: `<a href="#">Why do I have this issue?</a>`,
    });

    throw error;
  }
};

const logout = async () => {
  const result = await Swal.fire({
    title: "Confirm Logout",
    text: "Are you sure you want to exit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Signout",
    cancelButtonText: "No, Keep Signin",
  });

  if (result.isConfirmed) {
    await signOut(auth);
    localStorage.removeItem("userSession");

    Swal.fire({
      title: "Logged Out",
      text: "You have successfully logged out.",
      icon: "info",
      confirmButtonText: "OK",
    });
  }
};

export { signInWithGoogle, logout };
