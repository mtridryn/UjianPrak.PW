import { db } from "@/app/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default async function uploadDataProduct(
  name: string,
  price: number,
  quantityInStock: number,
  category: string,
  description: string,
  image_url: string,
  user_id: string,
  variant: string[],
  color: string[],
) {
  const productCollection = collection(db, "product");
  const userRef = doc(db, "users", user_id);

  try {
    const productRef = await addDoc(productCollection, {
      product_id: "",
      name,
      price,
      quantityInStock,
      category,
      description,
      image_url: `/image/product/${image_url}`,
      user_id: userRef,
      variant,
      color,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    const productId = productRef.id;

    await setDoc(
      productRef,
      {
        product_id: productId,
      },
      { merge: true },
    );

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: `Product added successfully`,
    });
  } catch (e) {
    await Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while adding the product. Please try again.",
    });
  }
}
