import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const updateDataProfile = async (
  userId: string,
  name: string,
  email: string,
  phone: string,
  location: string,
) => {
  const cartRef = doc(db, "users", userId);
  try {
    await updateDoc(cartRef, {
      name,
      email,
      phone,
      location,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while updating the profile. Please try again..",
    });
  }
};

export default updateDataProfile;
