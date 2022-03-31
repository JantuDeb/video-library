import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/sidebar/SidebarContext";
import { VideoProvider } from "./context/videos/VideoContext";
import { PlaylistProvidder } from "./context/playlist/PlaylistContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <VideoProvider>
          <PlaylistProvidder>
            <App />
          </PlaylistProvidder>
        </VideoProvider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
