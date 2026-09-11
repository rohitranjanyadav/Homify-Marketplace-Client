import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";

export interface IProductFormValues {
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStock: number;
  categoryId: string;
  productImage: File | null;
}

export interface IProductAdmin {
  id: string;
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  productImageUrl: string;
  createdAt: string;
  categoryId: string;
  discount: number;
  Category: {
    categoryName: string;
  };
}

interface IInitialState {
  products: IProductAdmin[];
  status: Status;
}

const initialState: IInitialState = {
  products: [],
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: "adminProducts",
  initialState,

  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProducts(state: IInitialState, action: PayloadAction<IProductAdmin[]>) {
      state.products = action.payload;
    },
    addProductToProducts(
      state: IInitialState,
      action: PayloadAction<IProductAdmin>,
    ) {
      state.products.push(action.payload);
    },
    setDeleteProductItem(
      state: IInitialState,
      action: PayloadAction<string>,
    ) {
      const index = state.products.findIndex((product) => product.id == action.payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
  },
});

export const { setProducts, setStatus, addProductToProducts,setDeleteProductItem } =
  productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/product");
      if (response.status === 200) {
        dispatch(
          setProducts(
            Array.isArray(response.data.data) ? response.data.data : [],
          ),
        );
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
        throw new Error("Products could not be loaded");
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      throw error;
    }
  };
}

export function addProduct(productValues: IProductFormValues) {
  return async function addProductThunk(dispatch: AppDispatch) {
    try {
      const formData = new FormData();
      formData.append("productName", productValues.productName);
      formData.append("productDescription", productValues.productDescription);
      formData.append("productPrice", String(productValues.productPrice));
      formData.append(
        "productTotalStock",
        String(productValues.productTotalStock),
      );
      formData.append("categoryId", productValues.categoryId);
      if (productValues.productImage) {
        formData.append("productImage", productValues.productImage);
      }

      const response = await APIWITHTOKEN.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        await dispatch(fetchProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
        throw new Error("Product creation failed");
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      throw error;
    }
  };
}

export function handleProductItemDelete(productId: string) {
  return async function handleProductItemDeleteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/product/" + productId);
      if (response.status === 200) {
        dispatch(setDeleteProductItem(productId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
