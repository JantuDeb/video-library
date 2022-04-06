import {useEffect} from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useWatchLaterVideos } from "../../context/watch-later/WatchLaterVideoContext";

const WatchLater = () => {
  const { watchLaterVideos,getWatchLaterVideos  } = useWatchLaterVideos();
  useEffect(() => {
    getWatchLaterVideos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <div className="videos p-2">
        {watchLaterVideos.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
