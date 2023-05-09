import { Box, Button, Divider, Stack } from "@mui/material";
import React, { useReducer } from "react";
import ProductItem from "./ProductItem";
import { Product as ProductDetails } from "./../ulits/interfaces";
import { AppContext } from "../context/context";
import { DiscountTypes, Types } from "../context/reducers";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
export interface IProduct {
  id: number;
  discount?: {
    type: string;
    value: string;
  };
  productDetails?: ProductDetails;
}

export default function ProductTable() {
  const { state, dispatch } = React.useContext(AppContext);
  console.log(state.products);
  function handleDrag(param: DropResult) {
    {
      console.log("handling");

      const srcI = param.source.index;
      const desI = param.destination?.index;
      let products = state.products;
      if (desI) {
        products.splice(desI, 0, products.splice(srcI, 1)[0]);
        console.log("rearage", products);

        dispatch({
          type: Types.RearrangeProducts,
          payload: {
            products: products,
          },
        });
      }
    }
  }
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
        width: "515px",
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
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <Stack gap={2} ref={provided.innerRef} {...provided.droppableProps}>
              {state.products.map((p, idx) => (
                <>
                  <Draggable
                    key={p.id}
                    draggableId={`draggable-${p.id}`}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <ProductItem
                        provided={provided}
                        idx={idx}
                        dispatch={dispatch}
                        product={p}
                      />
                    )}
                  </Draggable>
                </>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        variant="outlined"
        sx={{
          alignSelf: "flex-end",
          justifySelf: "center",
          mr: "27px",
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
