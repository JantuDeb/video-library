import React from "react";
import { useVideos } from "../../context/videos/VideoContext";
import HorizontalVideoCard from "./video-card/HorizontalVideoCard";

const RecommendedVideos = ({ currentVideoId }) => {
  const { videos } = useVideos();
  return (
    <div className="recomended-videos">
      {videos
        .filter((video) => video._id !== currentVideoId)
        .slice(0, 5)
        .map((video) => (
          <HorizontalVideoCard video={video} key={video._id} />
        ))}
    </div>
  );
};

export default RecommendedVideos;
