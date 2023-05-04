import { Button } from "@mui/material";
import React from "react";
interface Props {
  text: string;
}
export default function StyledButton({ text }: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        boxShadow: "none",
        height: "32px",
        px: "25px",
      }}
    >
      {text}
    </Button>
  );
}
