import { Route, Routes } from "react-router-dom";
// import History from "./pages/history/History";
import Home from "./pages/home/Home";
import Layout from "./pages/Layout";
import LikedVideo from "./pages/liked-videos/LikedVideo";
import PlayList from "./pages/playlist/PlayList";
import VideoDetails from "./pages/video-details/VideoDetails";
import WatchLater from "./pages/watchlater/WatchLater";

function App() {
  return (
      <Routes>
        <Route path="/" element={ <Layout><Home /></Layout>} />
        <Route path="/playlist" element={ <Layout><PlayList /></Layout>} />
        <Route path="/watch-later" element={ <Layout><WatchLater /></Layout>} />
        <Route path="/liked-videos" element={ <Layout><LikedVideo /></Layout>} />
        {/* <Route path="/history" element={ <Layout><History /></Layout>} /> */}
        <Route path="/video" element={<VideoDetails />} />
      </Routes>
  );
}

export default App;
