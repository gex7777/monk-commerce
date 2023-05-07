import { Button, ButtonProps } from "@mui/material";
import React from "react";
interface Props extends ButtonProps {
  text: string;
}
export default function StyledButton({ text, ...others }: Props) {
  return (
    <Button
      {...others}
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
