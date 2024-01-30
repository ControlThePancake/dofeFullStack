import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import NavBar from "scenes/navBar";
import QuizzizPage from "scenes/quizzizBot";
import KahootPage from "scenes/kahootBot";
import BlooketPage from "scenes/blooketBot";
import AboutUs from "scenes/aboutUs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={!isAuth ? <LoginPage />: <Navigate to="/home"/>} />/
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/"/> } />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/> } />
            <Route path="/quizzizbot" element={isAuth ?<QuizzizPage />: <Navigate to="/"/>} />
            <Route path="/kahootbot" element={isAuth ?<KahootPage />: <Navigate to="/"/>} />
            <Route path="/blooketbot" element={isAuth ?<BlooketPage />: <Navigate to="/"/>} />
            <Route path="/aboutUs" element={isAuth ? <AboutUs />: <Navigate to="/"/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
