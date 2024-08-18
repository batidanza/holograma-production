import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import "./App.css";
import AppRoutes from "./routes/Routes";
import { UserProvider } from "./components/user/context/UserContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Footer from "./components/layout/footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("isLoggedIn set to true");
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
    <UserProvider>
      <Router>
        <div>
          <Navbar isLoggedIn={isLoggedIn} />
          <div className="content">
            <AppRoutes isLoggedIn={isLoggedIn} />
            <Footer />
          </div>
        </div>
      </Router>
    </UserProvider>
    </I18nextProvider>
  );
}

export default App;
