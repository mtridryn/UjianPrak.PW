import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default async function updateDataProduct(
  productId: string,
  name: string,
  price: number,
  quantityInStock: number,
  category: string,
  description: string,
  image_url: string,
  variant: string[],
  color: string[],
) {
  const productRef = doc(db, "product", productId);
  try {
    await updateDoc(productRef, {
      name,
      price,
      quantityInStock,
      category,
      description,
      image_url,
      variant,
      color,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Product updated successfully.",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while updating the product. Please try again..",
    });
  }
}
