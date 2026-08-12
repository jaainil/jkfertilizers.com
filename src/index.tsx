import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/outfit/wght.css";
import "@fontsource-variable/playfair-display/wght.css";
import "@/index.css";
import App from "@/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);