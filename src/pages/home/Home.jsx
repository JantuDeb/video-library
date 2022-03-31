import React from "react";
import Categories from "../../components/category/Categories";

import VideoCard from "../../components/shared/VideoCard";
import { useVideos } from "../../context/videos/VideoContext";
import "./Home.css";
const Home = () => {
  const { videos } = useVideos();

  return (
    <div className="flex flex-col container">
      <div className="wrapper">
        <Categories />
      </div>
      <div className="videos p-2">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
