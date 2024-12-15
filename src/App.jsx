import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import "./App.css";
import AppRoutes from "./routes/Routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthContextProvider } from "./AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </I18nextProvider>
    </AuthContextProvider>
  );
}

export default App;
