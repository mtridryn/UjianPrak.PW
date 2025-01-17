type CartItem = {
    cart_id: string;
    product_id: string;
    image_url?: string;
    name?: string;
    description?: string;
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    price: number;
    total_price: number;
  };

export default CartItem;