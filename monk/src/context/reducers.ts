import { IProduct } from "../components/ProductTable";
import { Product, VariantsEntity } from "../ulits/interfaces";

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
  CreateAfterID = "CREATE_AFTER_ID",
  Delete = "DELETE_PRODUCT",
  AddDiscount = "ADD_DISCOUNT",
  AddVariantDiscount = "ADD_VARIANT_DISCOUNT",
  AddProduct = "ADD_PRODUCT",
  DeleteVariant = "DELETE_VARIANT",
  RearrangeProducts = "REARRANGEPRODUCTS",
  RearrangeVariants = "REARRANGEVARIANTS",
}

export enum DiscountTypes {
  Flat = "Flat",
  Off = "%Off",
}
type ProductPayload = {
  [Types.Create]: null;
  [Types.AddDiscount]: {
    id: number;
    discount: {
      type: string;
      value: string;
    };
  };
  [Types.AddVariantDiscount]: {
    id: number;
    variantId: number;
    discount: {
      type: string;
      value: string;
    };
  };
  [Types.AddProduct]: {
    id: number;
    product: Product;
  };
  [Types.Delete]: {
    id: number;
  };
  [Types.DeleteVariant]: {
    id: number;
    variantId: number;
  };
  [Types.RearrangeProducts]: {
    products: IProduct[];
  };
  [Types.RearrangeVariants]: {
    variants: VariantsEntity[];
    id: number;
  };
  [Types.CreateAfterID]: {
    product: IProduct;
    idx: number;
  };
};

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

//functions
export interface ProductsState {
  products: IProduct[];
}

//reducer

export const productReducer = (
  state: IProduct[] | any[],
  action: ProductActions
) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: Date.now(),
        },
      ];
    case Types.AddDiscount:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            discount: action.payload.discount,
          };
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
    case Types.Delete:
      return state.filter((product) => product.id !== action.payload.id);

    case Types.DeleteVariant:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          let productDetails = {
            ...product.productDetails,
            variants: product.productDetails?.variants.filter(
              (variant: any) => variant.id !== action.payload.variantId
            ),
          };

          return {
            ...product,
            productDetails: productDetails,
          };
        }

        return product;
      });

    case Types.AddVariantDiscount:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          let productDetails = {
            ...product.productDetails,
            variants: product.productDetails?.variants.map((variant: any) => {
              if (variant.id === action.payload.variantId) {
                return { ...variant, discount: action.payload.discount };
              }
              return variant;
            }),
          };

          return {
            ...product,
            productDetails: productDetails,
          };
        }

        return product;
      });
    case Types.RearrangeProducts:
      return action.payload.products;
    case Types.RearrangeVariants:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            productDetails: {
              ...product.productDetails,
              variants: action.payload.variants,
            },
          };
        }
        return product;
      });

    case Types.CreateAfterID:
      let products = state;
      products.splice(action.payload.idx, 0, action.payload.product);
      return products;
    default:
      return state;
  }
};
