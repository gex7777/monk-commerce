import React, { ReactNode } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ boxShadow: "none", borderBottom: "" }}>
        <Toolbar></Toolbar>
      </AppBar>

      <Box component="main" sx={{ padding: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
