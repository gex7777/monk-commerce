import { Box, Container } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import ProductTable from "./components/ProductTable";

export default function MainSection() {
  return (
    <Box
      sx={{
        height: "90vh",
        background: (theme) => theme.palette.primary.main,
        pt: 3,
      }}
    >
      <Typography
        sx={{
          pt: 1,
          pl: 2,
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: 3,
        }}
      >
        Add Products
      </Typography>
      <ProductTable></ProductTable>
    </Box>
  );
}
