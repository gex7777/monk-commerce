import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import { themeOptions } from "./ulits/theme";
import MainSection from "./components/MainSection";
const theme = createTheme(themeOptions);
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <MainSection />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
