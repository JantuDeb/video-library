import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VideoProvider } from "./context/videos/VideoContext";
import { PlaylistProvidder } from "./context/playlist/PlaylistContext";
import { LikedVideoProvider } from "./context/liked-videos/LikedVideoContext";
import { WatchLaterVideoProvider } from "./context/watch-later/WatchLaterVideoContext";
import { HistoryVideoProvider } from "./context/history/HistoryContext";
import { AuthProvider } from "./context/auth/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <AuthProvider>
          <PlaylistProvidder>
            <LikedVideoProvider>
              <WatchLaterVideoProvider>
                <HistoryVideoProvider>
                  <App />
                </HistoryVideoProvider>
              </WatchLaterVideoProvider>
            </LikedVideoProvider>
          </PlaylistProvidder>
        </AuthProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
