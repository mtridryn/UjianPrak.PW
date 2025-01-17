import { db } from "@/app/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Category from "@/app/lib/model/category";
import Product from "@/app/lib/model/product";

export const getProductByProductId = async (
  productId: string | string[] | undefined,
): Promise<Product | null> => {
  try {
    const productCollection = collection(db, "product");
    const productQuery = query(
      productCollection,
      where("product_id", "==", productId),
    );
    const productSnap = await getDocs(productQuery);

    if (!productSnap.empty) {
      const productData = productSnap.docs[0].data();
      const product: Product = {
        product_id: productSnap.docs[0].id,
        ...productData,
      } as Product;

      // const categoryRef = doc(db, "category", productData.category_id.id);
      // const categorySnap = await getDoc(categoryRef);

      // if (categorySnap.exists()) {
      //   product.category = {
      //     category_id: categorySnap.id,
      //     ...categorySnap.data(),
      //   } as Category;
      // } else {
      //   console.error("Category not found for ID:", productData.category_id.id);
      // }

      return product;
    }

    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
