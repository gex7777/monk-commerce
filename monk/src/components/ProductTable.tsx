import { Box, Button, Stack } from "@mui/material";
import React, { useReducer } from "react";
type DiscountTypes = "flat" | "%off";
interface Product {
  id: string;
  discount?: {
    type: DiscountTypes;
    value: number;
  };
}
type Action = {
  type: string;
  id?: string;
};
const initialState = { products: [] as Product[] };

function productReducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case "add-product": {
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: Date.now().toString(),
          },
        ],
      };
    }
    case "add-discount": {
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === action.id) return { ...p, discount: p.discount };
          else {
            return p;
          }
        }),
      };
    }
    default:
      return state;
  }
}
export default function ProductTable() {
  const [products, dispatch] = useReducer(productReducer, initialState);
  function addProduct() {
    dispatch({
      type: "add-product",
    });
  }
  return (
    <Stack sx={{ mt: 3, width: "100%" }}>
      <Stack sx={{ width: "100%" }} direction="row">
        <div
          style={{
            fontSize: "14px",
            flex: 1,
            textAlign: "left",
            paddingLeft: "4rem",
            fontWeight: 600,
          }}
        >
          Product
        </div>
        <div
          style={{
            fontSize: "14px",
            flex: 1,
            textAlign: "left",
            paddingLeft: "1rem",
            fontWeight: 600,
          }}
        >
          Discount
        </div>
      </Stack>
      {/* <>
              {products.map((p, idx) => (
                <ProductItem p={p} idx={idx} dispatch={dispatch} />
              ))}
            </> */}

      <Button onClick={addProduct}>Add Product</Button>
    </Stack>
  );
}
