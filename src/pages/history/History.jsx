import React from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useHistoryVideos } from "../../context/history/HistoryContext";

const History = () => {
  const { historyVideos, deleteHistories } = useHistoryVideos();
  return (
    <div className="container">
      <div className="flex justify-between items-center p-2">
        <h2>History</h2>
        <button className="btn-red px-2 py-1 radius-md" onClick={()=>deleteHistories()}>Clear History</button>
      </div>
      <div className="videos p-2">
        {historyVideos.map((video) => (
          <VideoCard key={video._id} video={video} history={true} />
        ))}
      </div>
    </div>
  );
};

export default History;
