import { db } from "@/app/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteProductById = async (
  productId: string
): Promise<boolean> => {
  try {
    const productRef = doc(db, "product", productId);

    await deleteDoc(productRef);

    console.log(`Product with ID ${productId} has been deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
