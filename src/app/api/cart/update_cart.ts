import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const updateCartItem = async (id: string, newQuantity: number, newTotalPrice: number) => {
    // const cartRef = doc(db, "cart", id);   

    const cartCollection = collection(db, "cart");
    const cartQuery = query(cartCollection, where("cart_id", "==", id));
    const querySnapshot = await getDocs(cartQuery);
  
    try {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'An error occurred while updating the cart. Please try again..'
      });
    }
  };

export default updateCartItem;