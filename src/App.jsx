import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import "./App.css";
import AppRoutes from "./routes/Routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthContextProvider } from "./AuthContext";
import BrownBackgroundSketch from "./components/layout/skins/BrownBackgroundSketch";
import VioletBlueBackgroundSketch from "./components/layout/skins/VioletBlueBackgroundSketch.jsx";

function App() {
  const [skin, setSkin] = useState(false);

  console.log(skin);

  return (
    <AuthContextProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          {/* Fondo */}
          <div className="background-canvas">
            {skin === true ? (
              <BrownBackgroundSketch />
            ) : (
              <VioletBlueBackgroundSketch />
            )}
          </div>

          {/* Contenido */}
          <div className="app-content">
            <Navbar skin={skin} setSkin={setSkin} />
            <AppRoutes />
          </div>
        </Router>
      </I18nextProvider>
    </AuthContextProvider>
  );
}

export default App;
