import { Box, Button, Stack } from "@mui/material";
import React, { useReducer } from "react";
import ProductItem from "./ProductItem";
import { Product as ProductDetails } from "./../ulits/interfaces";
import { AppContext } from "../context/context";
import { DiscountTypes, Types } from "../context/reducers";

export interface IProduct {
  id: string;
  discount?: {
    type: DiscountTypes;
    value: number;
  };
  productDetails?: ProductDetails;
}

export default function ProductTable() {
  const { state, dispatch } = React.useContext(AppContext);
  function addProduct() {
    dispatch({
      type: Types.Create,
      payload: null,
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
          <ProductItem key={p.id} dispatch={dispatch} product={p} />
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
