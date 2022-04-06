import { useEffect } from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useLikedVideos } from "../../context/liked-videos/LikedVideoContext";

const LikedVideo = () => {
  // const likedVideos = [];

  const { likedVideos, getLikedVideos } = useLikedVideos();
  useEffect(() => {
    getLikedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
