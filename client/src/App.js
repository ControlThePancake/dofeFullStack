import {BroweserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import NavBar from "scenes/navBar";
import QuizzizPage from "scenes/quizzizBot";
import KahootPage from "scenes/kahootBot";
import BlooketPage from "scenes/blooketBot";


function App() {
  return (
    <div className="app">
      <BroweserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/quizziz" element={<QuizzizPage />} />
          <Route path="/kahoot" element={<KahootPage />} />
          <Route path="/blooket" element={<BlooketPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BroweserRouter>
      
    </div>
  );
}

export default App;
