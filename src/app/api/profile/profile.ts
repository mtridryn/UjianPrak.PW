import { db } from "@/app/lib/firebase";
import Profile from "@/app/lib/model/profile";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

export const getProfileByUserId = async (
  userId: string,
): Promise<Profile | null> => {
  try {
    const userCollection = collection(db, "users");

    const profileQuery = query(userCollection, where("user_id", "==", userId));
    const profileSnap = await getDocs(profileQuery);

    if (profileSnap.empty) {
      console.error("No profiles found for user_id:", userId);
      return null;
    }

    const profileData = profileSnap.docs[0].data();

    const createdAt =
      profileData.created_at instanceof Timestamp
        ? profileData.created_at.toDate().toISOString()
        : new Date().toISOString();

    const updatedAt =
      profileData.updated_at instanceof Timestamp
        ? profileData.updated_at.toDate().toISOString()
        : new Date().toISOString();

    const profileItem: Profile = {
      user_id: profileData.user_id,
      created_at: createdAt,
      name: profileData.name,
      email: profileData.email,
      isGmail: profileData.isGmail,
      location: profileData.location,
      picture: profileData.picture,
      phone: profileData.phone,
      role: profileData.role,
      updated_at: updatedAt,
    };

    return profileItem;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return null;
  }
};
