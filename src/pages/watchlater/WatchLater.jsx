import VideoCard from "../../components/shared/video-card/VideoCard";
import { useWatchLaterVideos } from "../../context/watch-later/WatchLaterVideoContext";

const WatchLater = () => {
  const { watchLaterVideos } = useWatchLaterVideos();

  return (
    <div className="container">
      <div className="videos p-2">
        {watchLaterVideos.length === 0 && (
          <h4 className="text-center p-2">No videos in watchlater</h4>
        )}
        {watchLaterVideos.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
