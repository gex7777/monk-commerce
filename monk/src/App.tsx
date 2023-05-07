import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Layout from "./components/Layout";
import { themeOptions } from "./ulits/theme";
import MainSection from "./components/MainSection";
import { AppProvider } from "./context/context";
const theme = createTheme(themeOptions);
function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <MainSection />
        </Layout>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
