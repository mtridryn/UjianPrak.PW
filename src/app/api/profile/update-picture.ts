import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const updatePicture = async (userId: string, picture: string) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      picture,
    });

    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.data();

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Picture name has been updated successfully.",
      confirmButtonText: "OK",
    });

    // window.location.reload();
    return updatedUserData;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while updating the picture. Please try again..",
    });
  }
};

export default updatePicture;
