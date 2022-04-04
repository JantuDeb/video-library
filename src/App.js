import { Route, Routes } from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/shared/PrivateRoute";
import History from "./pages/history/History";
import Home from "./pages/home/Home";
import Layout from "./pages/Layout";
import LikedVideo from "./pages/liked-videos/LikedVideo";
import PlayList from "./pages/playlist/PlayList";
import Profile from "./pages/profile/Profile";
import VideoDetails from "./pages/video-details/VideoDetails";
import WatchLater from "./pages/watchlater/WatchLater";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/playlist"
        element={
          <PrivateRoute>
            <PlayList />
          </PrivateRoute>
        }
      />
      <Route
        path="/watch-later"
        element={
          <PrivateRoute>
            <WatchLater />
          </PrivateRoute>
        }
      />
      <Route
        path="/liked-videos"
        element={
          <PrivateRoute>
            <LikedVideo />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LogIn />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/video" element={<VideoDetails />} />
    </Routes>
  );
}

export default App;
