import Category from "./category";
import User from "./user";

export default interface ProductList {
  product_id: string;
  name: string;
  category: string;
  price: number;
  // user?: User;
}
