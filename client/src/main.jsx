import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ ADD THIS
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UIProvider } from "./context/UIContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UIProvider>
          <BrowserRouter>   {/* ✅ ADD THIS */}
            <App />
          </BrowserRouter>  {/* ✅ ADD THIS */}
        </UIProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
