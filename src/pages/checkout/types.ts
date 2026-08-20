import { Status } from "../../globals/types/type";

interface IProduct {
  productId: string;
  productQty: number;
  orderStatus?: string;
  totalAmount?: number;
  Payment: {
    paymentMethod: PaymentMethod,
    
  };
}

export interface IOrderItems extends IProduct {
  id: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
}

export const PaymentMethod = {
  Esewa: "esewa",
  Khalti: "khalti",
  Cod: "cod",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface IData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  products: IProduct[];
}
