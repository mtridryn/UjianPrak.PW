import { db } from '@/app/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Cart from '@/app/lib/model/cart';
import Product from '@/app/lib/model/product';

export const getCartByUserId = async (userId: string): Promise<Cart[]> => {
    try {
        const cartCollection = collection(db, "cart");
        const userRef = doc(db, "users", userId);

        const cartQuery = query(cartCollection, where("user_id", "==", userRef));
        const cartSnap = await getDocs(cartQuery);
        
        const carts: Cart[] = [];
        
        for (const cartDoc of cartSnap.docs) {
            const cartData = cartDoc.data();            
            
            const productRef = doc(db, "product", cartData.product_id.id);
            const productSnap = await getDoc(productRef);
            
            let product: Product | undefined;
            
            if (productSnap.exists()) {
                product = {
                    product_id: productSnap.id,
                    ...productSnap.data(),
                } as Product;
            } else {
                console.error("Product not found for ID:", cartData.product_id.id);
            }
            
            const cartItem: Cart = {
                cart_id: cartData.cart_id,
                product_id: cartData.product_id,
                user_id: cartData.user_id,
                created_at: cartData.created_at.toDate(),
                price: cartData.price,
                product: product,
                quantity: cartData.quantity,
                selectedColor: cartData.selectedColor,
                selectedSize: cartData.selectedSize,
                totalPrice: cartData.totalPrice,
                updated_at: cartData.updated_at.toDate()
            };
            
            carts.push(cartItem);
        }

        return carts;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};
