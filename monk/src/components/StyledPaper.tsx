import { Paper } from "@mui/material";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export const StyledPaper: React.FC<Props> = ({ children, ...other }) => {
  return (
    <Paper
      {...other}
      elevation={0}
      sx={{
        boxShadow: "0px 2px 4px 0px #0000001A",
        display: "flex",

        justifyContent: "space-between",
        border: "1px solid #00000012",
        minWidth: "fit-content",
        borderRadius: "0",

        height: "32px",
        fontSize: "14px",
      }}
    >
      {children}
    </Paper>
  );
};
