import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/sidebar/SidebarContext";
import { VideoProvider } from "./context/videos/VideoContext";
import { PlaylistProvidder } from "./context/playlist/PlaylistContext";
import { LikedVideoProvider } from "./context/liked-videos/LikedVideoContext";
import { WatchLaterVideoProvider } from "./context/watch-later/WatchLaterVideoContext";
import { HistoryVideoProvider } from "./context/history/HistoryContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <VideoProvider>
          <PlaylistProvidder>
            <LikedVideoProvider>
              <WatchLaterVideoProvider>
                <HistoryVideoProvider>
                  <App />
                </HistoryVideoProvider>
              </WatchLaterVideoProvider>
            </LikedVideoProvider>
          </PlaylistProvidder>
        </VideoProvider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
