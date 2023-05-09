import { Box, InputBase, MenuItem, Paper, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close-icon2.svg";
import { VariantsEntity } from "../ulits/interfaces";
import { IDiscount } from "./ProductItem";
import { DiscountTypes, Types } from "../context/reducers";
import { AppContext } from "../context/context";
import { ReactComponent as ChervonIcon } from "../assets/chervon-icon.svg";
import StyledButton from "./StyledButton";
import { DraggableProvided } from "react-beautiful-dnd";
import { ReactComponent as DragIcon } from "../assets/drag-icon.svg";
interface Props {
  variant: VariantsEntity;
  id: number;
  provided: DraggableProvided;
}
export const VariantItem = ({ variant, id, provided }: Props) => {
  const [showDiscount, setShowDiscount] = useState(Boolean(!!variant.discount));
  const { dispatch } = React.useContext(AppContext);
  const firstRender = useRef(true);
  const [discount, setDiscount] = useState<IDiscount>({
    value: "0",
    type: DiscountTypes.Off,
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    addVariantDiscount();
  }, [discount, showDiscount]);

  function addVariantDiscount() {
    console.log("fired");

    dispatch({
      type: Types.AddVariantDiscount,
      payload: {
        id: id,
        variantId: variant.id,
        discount: discount,
      },
    });
  }

  function deleteProductVariant(variantId: number) {
    console.log(" delete variant fired");

    dispatch({
      type: Types.DeleteVariant,
      payload: {
        id: id,
        variantId: variantId,
      },
    });
  }
  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      sx={{ width: "100%" }}
      key={variant.id}
    >
      <Box sx={{ flexBasis: "100%", height: "0" }}></Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Box {...provided.dragHandleProps}>
          <DragIcon />
        </Box>
        <Paper
          elevation={0}
          sx={{
            boxShadow: "0px 2px 4px 0px #0000001A",
            display: "flex",

            justifyContent: "space-between",
            border: "1px solid #00000012",
            minWidth: "250px",
            borderRadius: "20px",
            pl: "7px",
            pt: "7px",
            height: "32px",
            fontSize: "14px",
          }}
        >
          {variant.title}
        </Paper>
        <Box sx={{ display: "flex", width: "167px" }}>
          {showDiscount ? (
            <>
              <Paper
                elevation={0}
                sx={{
                  boxShadow: "0px 2px 4px 0px #0000001A",
                  display: "flex",

                  justifyContent: "space-between",
                  border: "1px solid #00000012",
                  minWidth: "fit-content",
                  borderRadius: "20px",

                  height: "32px",
                  fontSize: "14px",
                }}
              >
                <InputBase
                  autoFocus
                  type="numbers"
                  value={
                    variant.discount?.value
                      ? variant.discount.value
                      : discount.value
                  }
                  onChange={(e) => {
                    setDiscount((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }));
                  }}
                  inputProps={{ "aria-label": "search" }}
                  sx={{ fontSize: "14px", width: "69px", pl: "7px" }}
                />
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  boxShadow: "0px 2px 4px 0px #0000001A",
                  display: "flex",

                  justifyContent: "space-between",
                  border: "1px solid #00000012",
                  minWidth: "fit-content",
                  borderRadius: "20px",

                  height: "32px",
                  fontSize: "14px",
                }}
              >
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
                    variant.discount?.type
                      ? variant.discount.type
                      : discount.type
                  }
                  onChange={(e) =>
                    setDiscount((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <MenuItem value={DiscountTypes.Off}>
                    {DiscountTypes.Off}
                  </MenuItem>
                  <MenuItem value={DiscountTypes.Flat}>
                    {DiscountTypes.Flat}
                  </MenuItem>
                </Select>
              </Paper>
            </>
          ) : (
            <StyledButton
              text="Add Discount"
              onClick={() => setShowDiscount(true)}
              variant="contained"
            />
          )}
        </Box>
        <Box onClick={() => deleteProductVariant(variant.id)}>
          <CloseIcon />
        </Box>
      </Box>
    </Box>
  );
};
