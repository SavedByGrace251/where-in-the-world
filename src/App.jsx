import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { themeModeState } from "./atoms/themeMode.state";
import { CountryPage, Home, Favorites } from "./pages";
import { NavigationBar } from "./shared/NavigationBar";

function App() {
  const themeMode = useRecoilValue(themeModeState);

  const isLightMode = themeMode === "light";

  const theme = createTheme({
    palette: isLightMode
      ? {
          mode: "light",
          primary: {
            main: "#fff",
            contrastText: "#000",
          },
          secondary: {
            main: "#000",
            contrastText: "#fff",
          },
          background: {
            paper: "#fff",
            default: "#fafafa",
          },
          text: {
            primary: "#000",
          },
        }
      : {
          mode: "dark",
          primary: {
            main: "#2b3743",
            contrastText: "#fff",
          },
          secondary: {
            main: "#fff",
            contrastText: "#000",
          },
          background: {
            paper: "#2b3743",
            default: "#202d36",
          },
          text: {
            primary: "#fff",
          },
        },
    components: {
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: isLightMode ? "#000" : "#fff",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction='column'
          flexWrap='nowrap'
          justifyContent='start'
          alignItems='stretch'
          sx={{
            height: "100vh",
            backgroundColor: isLightMode ? "#fafafa" : "#202d36",
            color: theme.palette.primary.contrastText,
          }}
        >
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/:countryId' element={<CountryPage />} />
          </Routes>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
