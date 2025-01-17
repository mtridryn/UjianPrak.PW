import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductPreview from '@/app/lib/model/product_review';

export const getLowStockProducts = async (): Promise<ProductPreview[]> => {
    try {
        const productCollection = collection(db, "product");

        const lowStockProductsQuery = query(
            productCollection,
            where("quantityInStock", "<", 15)
        );

        const productSnap = await getDocs(lowStockProductsQuery);

        const lowStockProducts: ProductPreview[] = productSnap.docs.map((doc) => {
            const data = doc.data();
            return {
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                price: data.price,
                image_url: data.image_url,
            } as ProductPreview;
        });

        return lowStockProducts;
    } catch (error) {
        console.error("Error fetching low stock products:", error);
        return [];
    }
};
