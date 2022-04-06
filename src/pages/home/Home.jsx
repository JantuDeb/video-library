import React from "react";
import Categories from "../../components/category/Categories";
import Loader from "../../components/loader/Loader";

import VideoCard from "../../components/shared/video-card/VideoCard";
import { useVideos } from "../../context/videos/VideoContext";
import "./Home.css";
const Home = () => {
  const {
    videos,
    videoState: { loading },
  } = useVideos();

  return (
    <div className="flex flex-col container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="wrapper">
            <Categories />
          </div>
          <div className="videos p-2">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
