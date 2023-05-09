import {
  Box,
  InputBase,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import React, { Dispatch, HTMLProps, useEffect, useRef, useState } from "react";
import { ReactComponent as DragIcon } from "../assets/drag-icon.svg";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import Popup from "./Popup";
import StyledButton from "./StyledButton";
import { IProduct } from "./ProductTable";
import { DiscountTypes, ProductActions, Types } from "../context/reducers";
import { StyledPaper } from "./StyledPaper";
import { ReactComponent as ChervonIcon } from "../assets/chervon-icon.svg";
import { ReactComponent as CloseIcon } from "../assets/close-icon2.svg";
import { AppContext } from "../context/context";
import { VariantItem } from "./VariantItem";
import { DraggableProvided } from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
interface Props extends HTMLProps<HTMLDivElement> {
  dispatch: Dispatch<ProductActions>;
  product: IProduct;
  idx: number;
  provided: DraggableProvided;
}
export interface IDiscount {
  value: string;
  type: string;
}
export default function ProductItem({ product, idx, provided }: Props) {
  const { state, dispatch } = React.useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const firstRender = useRef(true);
  const [discount, setDiscount] = useState<IDiscount>({
    value: "0",
    type: DiscountTypes.Off,
  });
  const handleVariantDrag = (param: DropResult) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    let variants = product.productDetails?.variants;
    if ((desI || desI === 0) && !!variants) {
      variants.splice(desI, 0, variants.splice(srcI, 1)[0]);
      console.log("rearage vriants", variants);

      dispatch({
        type: Types.RearrangeVariants,
        payload: {
          variants: variants,
          id: product.id,
        },
      });
    }
  };
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    addDiscount();
  }, [showDiscount, discount]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function addDiscount() {
    console.log("fired");

    dispatch({
      type: Types.AddDiscount,
      payload: {
        id: product.id,
        discount: discount,
      },
    });
  }

  function deleteProduct() {
    console.log(" delete fired");

    dispatch({
      type: Types.Delete,
      payload: {
        id: product.id,
      },
    });
  }

  return (
    <Box ref={provided.innerRef} {...provided.draggableProps}>
      <Stack
        alignItems={"center"}
        gap={"16px"}
        direction={"row"}
        flexWrap={"wrap"}
        sx={{ pb: "15px" }}
      >
        <Box {...provided.dragHandleProps}>
          <DragIcon />
        </Box>
        <Box sx={{ minWidth: "14px" }}>{idx + 1}.</Box>
        <StyledPaper>
          <Box
            sx={{
              width: "215px",
              color: "#00000080",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
              px: "7px",
              pt: "7px",
            }}
          >
            <Typography noWrap>
              {!!product.productDetails?.title
                ? product.productDetails.title
                : `Select Product`}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              height: "100%",
              ":hover": {
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)),linear-gradient(0deg, #FFFFFF, #FFFFFF)",
              },
            }}
            onClick={handleClickOpen}
          >
            <EditIcon />
          </Box>
          {open && (
            <Popup open={open} setOpen={setOpen} id={product.id} index={idx} />
          )}
        </StyledPaper>
        <Box
          sx={{
            width: "167px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {showDiscount ? (
            <>
              <StyledPaper>
                <InputBase
                  autoFocus
                  type="numbers"
                  value={discount.value}
                  onChange={(e) => {
                    setDiscount((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }));
                  }}
                  inputProps={{ "aria-label": "search" }}
                  sx={{ fontSize: "14px", width: "69px", pl: "7px" }}
                />
              </StyledPaper>
              <StyledPaper>
                <Select
                  IconComponent={() => (
                    <Box sx={{ pr: "17px" }}>
                      <ChervonIcon />
                    </Box>
                  )}
                  sx={{
                    fontSize: "14px",
                    width: "95px",
                    border: "none",
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": {
                      border: 0,
                      borderRadius: "0px",
                    },
                  }}
                  value={
                    product.discount?.type
                      ? product.discount?.type
                      : discount.type
                  }
                  onChange={(e) =>
                    setDiscount((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <MenuItem value={DiscountTypes.Off}>
                    {DiscountTypes.Off}
                  </MenuItem>
                  <MenuItem value={DiscountTypes.Flat}>
                    {DiscountTypes.Flat}
                  </MenuItem>
                </Select>
              </StyledPaper>
            </>
          ) : (
            <StyledButton
              text="Add Discount"
              onClick={() => setShowDiscount(true)}
              variant="contained"
            />
          )}
        </Box>
        {state.products.length > 1 && (
          <Box onClick={() => deleteProduct()}>
            <CloseIcon />
          </Box>
        )}

        {!!product.productDetails?.variants &&
          product.productDetails?.variants.length > 1 && (
            <Box
              sx={{
                textAlign: "right",
                width: "100%",

                color: (theme) => theme.palette.secondary.main,
                cursor: "pointer",
              }}
              onClick={() => setShowVariants((prev) => !prev)}
            >
              {showVariants ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", textDecoration: "underline" }}
                  >
                    hide variants
                  </Typography>
                  <Typography
                    sx={{
                      transform: "rotate(180deg) ",
                      fontSize: "12px",
                    }}
                  >
                    v
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", textDecoration: "underline" }}
                  >
                    show variants
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>v</Typography>
                </Box>
              )}
            </Box>
          )}
        <DragDropContext onDragEnd={handleVariantDrag}>
          <Droppable droppableId="droppable-2">
            {(provided, _) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ width: "100%", gap: "8px" }}
              >
                {showVariants &&
                  !!product.productDetails?.variants.length &&
                  product.productDetails?.variants.length > 1 &&
                  product.productDetails?.variants.map((variant, idx) => (
                    <Draggable
                      key={variant.id}
                      draggableId={`draggable-${variant.id}`}
                      index={idx}
                    >
                      {(provided, _) => (
                        <VariantItem
                          variant={variant}
                          provided={provided}
                          id={product.id}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
    </Box>
  );
}
