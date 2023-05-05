import { Box, Button, Stack } from "@mui/material";
import React, { useReducer } from "react";
import ProductItem from "./ProductItem";
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
  const [state, dispatch] = useReducer(productReducer, initialState);
  function addProduct() {
    dispatch({
      type: "add-product",
    });
  }
  return (
    <Stack
      gap={2}
      sx={{
        mt: 3,
        width: "fit-content",
        height: "100%",

        minWidth: "422.467px",
      }}
    >
      <Stack sx={{ width: "100%" }} direction="row">
        <Box
          sx={{
            fontSize: "14px",
            flex: 1,
            textAlign: "left",
            paddingLeft: "4rem",
            fontWeight: 600,
          }}
        >
          Product
        </Box>
        <Box
          sx={{
            fontSize: "14px",
            flex: 1,
            textAlign: "left",
            paddingLeft: "6rem",

            fontWeight: 600,
          }}
        >
          Discount
        </Box>
      </Stack>
      <>
        {state.products.map((p, idx) => (
          <ProductItem key={p.id} />
        ))}
      </>

      <Button
        variant="outlined"
        sx={{
          alignSelf: "flex-end",
          justifySelf: "center",

          width: "fit-content",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 600,
          height: 48,
          px: "54px",
          borderColor: (theme) => theme.palette.primary.main,
          borderWidth: "2px",
          ":hover": {
            borderWidth: "2px",
          },
        }}
        onClick={addProduct}
      >
        Add Product
      </Button>
    </Stack>
  );
}
