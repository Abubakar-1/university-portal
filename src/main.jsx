import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ResponsiveProvider } from "./dir/Admin/components/ResponsiveProvider.jsx";
import { UserProvider } from "./dir/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResponsiveProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ResponsiveProvider>
  </React.StrictMode>
);
