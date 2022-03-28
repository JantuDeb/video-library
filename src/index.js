import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/sidebar/SidebarContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <SidebarProvider>
       <App/>
     </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
