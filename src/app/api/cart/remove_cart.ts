import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default async function removeCartItem(cartId: string): Promise<void> {
  try {
    
    const cartCollection = collection(db, "cart");
    const cartQuery = query(cartCollection, where("cart_id", "==", cartId));
    const querySnapshot = await getDocs(cartQuery);

    const cartRef = querySnapshot.docs[0].ref;

    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error removing item from Firebase cart:", error);
    throw error;
  }
}
