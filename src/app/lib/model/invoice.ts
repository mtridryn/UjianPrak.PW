import Product from "./product";

export interface InvoiceData {
  address: string;
  amount: number[];
  color: string[];
  confirmed: boolean;
  created_at: Date;
  current_price: number[];
  ekspedisi_id: string;
  handlingFee: number;
  paid_amount: number;
  payer_email: string;
  payment_channel: string;
  payment_method: string;
  product_id: any[];
  recipient: string;
  serviceFee: number;
  shippingCost: number;
  shippingETA: string;
  shippingName: string;
  status: string;
  telepon: string;
  totalQuantity: number;
  transaksi_id: string;
  updated_at: Date;
  user_id: string;
  variant: string[];
  products: Product[];
}
