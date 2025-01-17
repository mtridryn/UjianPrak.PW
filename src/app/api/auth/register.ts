import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import crypto from "crypto";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
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

export const registerUser = async (data: RegisterData) => {
  const { name, email, password } = data;

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format. Please use a valid email address.");
  }

  if (!isValidPassword(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one number, one symbol, and be at least 8 characters long."
    );
  }

  try {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(password, salt);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData = {
      user_id: user.uid,
      email: email,
      name: name,
      password: hashedPassword,
      salt: salt,
      role: false,
      isGmail: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    saveToSession(userData);

    return { message: "Registration successful!" };
  } catch (error: any) {
    console.error("Error registering user:", error);
    throw new Error(error.message || "Registration failed");
  }
};
