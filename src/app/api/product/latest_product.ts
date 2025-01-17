import { db } from '@/app/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import ProductPreview from '@/app/lib/model/product_review';

export const getLatestProducts = async (): Promise<ProductPreview[]> => {
    try {
        const productCollection = collection(db, "product");

        const latestProductsQuery = query(
            productCollection,
            orderBy("created_at", "desc"),
            limit(10)
        );

        const productSnap = await getDocs(latestProductsQuery);

        const latestProducts: ProductPreview[] = productSnap.docs.map((doc) => {
            const data = doc.data();
            return {
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                price: data.price,
                image_url: data.image_url,
            } as ProductPreview;
        });

        return latestProducts;
    } catch (error) {
        console.error("Error fetching latest products:", error);
        return [];
    }
};
