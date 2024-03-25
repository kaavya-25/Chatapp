import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./custom_hooks/context";
import AppRoutes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
