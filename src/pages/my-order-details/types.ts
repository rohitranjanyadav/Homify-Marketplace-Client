export const OrderStatus = {
  Preparation: "preparation",
  Ontheway: "ontheway",
  Delivered: "delivered",
  Pending: "pending",
  Cancelled: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  Khalti: "khalti",
  Esewa: "esewa",
  COD: "cod",
} as const;

export type PaymentMethod =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  Paid: "paid",
  Unpaid: "unpaid",
} as const;

export type PaymentStatus =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];
export interface IOrderDetail {
  id: string;
  quantity: number;
  createdAt: string;

  orderId: string;
  productId: string;
  Order: {
    orderStatus: OrderStatus;
    shippingAddress: string;
    totalAmount: number;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    Payment: {
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
    };
  };
  Product: {
    productImageUrl: string;
    productName: string;
    productPrice: number;
    Category: {
      categoryName: string;
    };
  };
}
