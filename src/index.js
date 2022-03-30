import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/sidebar/SidebarContext";
import { VideoProvider } from "./context/videos/VideoContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <SidebarProvider>
      <VideoProvider>
      <App/>
      </VideoProvider>
     </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
