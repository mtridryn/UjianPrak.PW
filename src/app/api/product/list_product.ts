import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import ProductList from "@/app/lib/model/product_list";

export const getProductsByUserId = async (): Promise<ProductList[] | null> => {
  try {
    const productCollection = collection(db, "product");

    /*  Note

    Note: Get data by user_id (admin id) or Get data by role true (admin)

    // Filter berdasarkan role = true

    const productCollection = collection(db, "product");
      const productQuery = query(
        productCollection,
        where("user_id.role", "==", true) // Menggunakan path untuk mencari role dalam dokumen user
      );

    Note : Bisa tampilkan semua data product
      
  */

    // const productQuery = query(
    //   productCollection,
    //   where("user_id", "==", doc(db, "users", userId)),
    // );

    const productSnap = await getDocs(productCollection);

    if (productSnap.empty) {
      console.warn("No products found");
      return null;
    }

    const products: ProductList[] = productSnap.docs.map((docSnap) => ({
      product_id: docSnap.id,
      ...docSnap.data(),
    })) as ProductList[];

    return products;
  } catch (error) {
    console.error("Error fetching products by user ID:", error);
    return null;
  }
};
