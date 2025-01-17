import { db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export async function ConfirmTransaction(
  transaksi_id: string,
  confirmed: boolean,
) {
  const transactionRef = doc(db, "transaksi", transaksi_id);
  try {
    if (confirmed) {
      await updateDoc(transactionRef, {
        confirmed,
      });
    }

    const transactionSnap = await getDoc(transactionRef);

    if (transactionSnap.exists()) {
      const transactionData = transactionSnap.data();
      console.log("Transaction Data:", transactionData);

      return transactionData.confirmed;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Not Found",
        text: "Transaction data not found.",
      });
      return null;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while updating the profile. Please try again..",
    });
  }
}
