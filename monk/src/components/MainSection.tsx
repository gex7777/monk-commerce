import { Box } from "@mui/material";

import { Typography } from "@mui/material";
import ProductTable from "./ProductTable";

export default function MainSection() {
  return (
    <Box
      sx={{
        height: "90vh",

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
