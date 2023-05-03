import { Box, Button, Input, Paper, Stack } from "@mui/material";
import React from "react";
import { ReactComponent as DragIcon } from "../assets/drag-icon.svg";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import Popup from "./Popup";
export default function ProductItem() {
  return (
    <Stack alignItems={"center"} gap={"16px"} direction={"row"}>
      <DragIcon />
      <div>1.</div>
      <Paper
        elevation={0}
        sx={{
          boxShadow: "0px 2px 4px 0px #0000001A",
          display: "flex",

          justifyContent: "space-between",
          border: "1px solid #00000012",
          minWidth: "215px",
          borderRadius: "0",

          height: "32px",
          fontSize: "14px",
        }}
      >
        <Box
          sx={{
            color: "#00000080",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "21px",
            px: "7px",
            pt: "7px",
          }}
        >
          Select Product
        </Box>
        <Popup>
          <EditIcon />
        </Popup>
      </Paper>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          boxShadow: "none",
          height: "32px",
          px: "25px",
        }}
      >
        Add Discount
      </Button>
    </Stack>
  );
}
