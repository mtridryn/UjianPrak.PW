import { db } from "@/app/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Cart from "@/app/lib/model/cart";
import Swal from "sweetalert2";

export default async function addCartItem(
  userId: string,
  productId: string,
  price: number,
  quantity: number,
  selectedSize: string,
  selectedColor: string,
) {
  try {
    const cartRef = collection(db, "cart");

    const userRef = doc(db, "users", userId);
    const productRef = doc(db, "products", productId);

    const q = query(
      cartRef,
      where("user_id", "==", userRef),
      where("product_id", "==", productRef),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      const currentData = cartDoc.data() as Cart;
      const newQuantity = currentData.quantity + quantity;
      const newTotalPrice = newQuantity * price;

      await updateDoc(doc(db, "cart", cartDoc.id), {
        quantity: newQuantity,
        totalPrice: newTotalPrice,
        updated_at: serverTimestamp(),
      });

      Swal.fire("Updated!", "The cart quantity has been updated.", "success");
    } else {
      await addDoc(cartRef, {
        cart_id: uuidv4(),
        user_id: userRef,
        product_id: productRef,
        price: price,
        quantity: quantity,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        totalPrice: price * quantity,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      Swal.fire("Added!", "The product has been added to the cart.", "success");
    }
  } catch (error: any) {
    Swal.fire("Error!", "There was an error updating the cart.", "error");
    console.error("Error adding/updating cart item: ", error);
  }
}
