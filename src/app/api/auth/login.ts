import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import crypto from "crypto";

interface LoginData {
  email: string;
  password: string;
}

const verifyPassword = (inputPassword: string, storedHash: string, salt: string) => {
  const hashedInputPassword = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, `sha256`).toString(`hex`);
  return hashedInputPassword === storedHash;
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const saveToSession = (data: any) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const sessionData = {
    user_id: data.user_id,
    name: data.name,
    email: data.email,
    role: data.role,
    expiresAt: Date.now() + oneDayInMs,
  };
  localStorage.setItem("userSession", JSON.stringify(sessionData));
};

export const loginUser = async (data: LoginData) => {
  const { email, password } = data;

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format. Please use a valid email address.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User not found in database.");
    }

    const userData = userDoc.data();
    
    if (!verifyPassword(password, userData.password, userData.salt)) {
      throw new Error("Incorrect password.");
    }

    saveToSession(userData);

    return { message: "Login successful!" };
  } catch (error: any) {
    console.error("Error logging in user:", error);
    throw new Error(error.message || "Login failed");
  }
};
