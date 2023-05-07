import { IProduct } from "../components/ProductTable";
import { Product } from "../ulits/interfaces";
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  AddDiscount = "ADD_DISCOUNT",
  AddProduct = "ADD_PRODUCT",
}

export enum DiscountTypes {
  Flat = "flat",
  Off = "%off",
}
type ProductPayload = {
  [Types.Create]: null;
  [Types.AddDiscount]: {
    id: string;
    discount: {
      type: DiscountTypes;
      value: number;
    };
  };
  [Types.AddProduct]: {
    id: string;
    product: Product;
  };
};

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

//functions
export interface ProductsState {
  products: IProduct[];
}

//reducer

export const productReducer = (state: IProduct[], action: ProductActions) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: Date.now.toString(),
        },
      ];
    case Types.AddDiscount:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, discount: action.payload.discount };
        }
        return product;
      });

    case Types.AddProduct:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, productDetails: action.payload.product };
        }
        return product;
      });

    default:
      return state;
  }
};
