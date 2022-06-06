import VideoCard from "../../components/shared/video-card/VideoCard";
import { useLikedVideos } from "../../context/liked-videos/LikedVideoContext";

const LikedVideo = () => {
  const { likedVideos } = useLikedVideos();

  return (
    <div className="container">
      {
        likedVideos.length===0 && <h4 className="text-center p-2">No videos in like</h4>
      }
      <div className="videos p-2">
        {likedVideos.map((video) => (
          <VideoCard key={video._id} video={video} isInLiked={true} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideo;
