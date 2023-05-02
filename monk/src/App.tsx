import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import { themeOptions } from "./ulits/theme";
const theme = createTheme(themeOptions);
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <></>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
