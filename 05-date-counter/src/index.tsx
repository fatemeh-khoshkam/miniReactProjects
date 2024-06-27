import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


const rootElement = document.getElementById("root") as HTMLElement;
const root:ReactDOM.Root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
