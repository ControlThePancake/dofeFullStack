import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import NavBar from "scenes/navBar";
import QuizzizPage from "scenes/quizzizBot";
import KahootPage from "scenes/kahootBot";
import BlooketPage from "scenes/blooketBot";
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
            <Route path="/quizziz" element={isAuth ?<QuizzizPage />: <Navigate to="/"/>} />
            <Route path="/kahoot" element={isAuth ?<KahootPage />: <Navigate to="/"/>} />
            <Route path="/blooket" element={isAuth ?<BlooketPage />: <Navigate to="/"/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
