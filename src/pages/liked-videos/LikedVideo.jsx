import React from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useLikedVideos } from "../../context/liked-videos/LikedVideoContext";

const LikedVideo = () => {
  // const likedVideos = [];

  const { likedVideos } = useLikedVideos();
  return (
    <div className="container">
      <div className="videos p-2">
        {likedVideos.map((video) => (
          <VideoCard key={video._id} video={video} isInLiked={true} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideo;
