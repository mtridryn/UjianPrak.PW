import Product from '@/app/lib/model/product'

interface Cart {
    cart_id: string;
    user_id: string;
    product_id: string;
    selectedColor: string;
    selectedSize: string;
    created_at: Date;
    price: number;
    product?: Product;
    quantity: number;
    totalPrice: number;
    updated_at: Date;
}

export default Cart