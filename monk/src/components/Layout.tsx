import { ReactNode } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import { ReactComponent as MonkLogo } from "../assets/logo.svg";
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #D1D1D1;",
          background: (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar style={{ minHeight: "45px" }}>
          <MonkLogo height={30.97} />

          <Typography
            noWrap
            component="div"
            sx={{
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 3,
              marginLeft: 2,

              display: { xs: "none", sm: "block" },
              color: "#7E8185",
            }}
          >
            Monk Upsell & Cross-sell
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" component="main" sx={{ mt: 8 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
