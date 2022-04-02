import React from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useHistoryVideos } from "../../context/history/HistoryContext";

const History = () => {
  const { historyVideos } = useHistoryVideos();
  return (
    <div className="container">
      <div className="videos p-2">
        {historyVideos.map((video) => (
          <VideoCard key={video._id} video={video} history={true} />
        ))}
      </div>
    </div>
  );
};

export default History;
