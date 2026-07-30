import type { Status } from "../../globals/types/type";

export interface ICartProduct {
  id: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

export interface ICartItem {
  id: string;
  quantity: string;
  productId: string;
  Product: ICartProduct;
}

export interface ICartInitialState {
  items: ICartItem[];
  status: Status;
}
