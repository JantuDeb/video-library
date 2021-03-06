import { useEffect } from "react";
import VideoCard from "../../components/shared/video-card/VideoCard";
import { useHistoryVideos } from "../../context/history/HistoryContext";

const History = () => {
  const { historyVideos, deleteHistories, getHistoryVideos } =
    useHistoryVideos();

  useEffect(() => {
    getHistoryVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <div className="flex justify-between items-center p-2">
        <h2>History</h2>
        <button
          className="btn-red px-2 py-1 radius-md"
          onClick={() => deleteHistories()}
        >
          Clear History
        </button>
      </div>
      <div className="videos p-2">
        {historyVideos.length === 0 && (
          <h4 className="text-center p-2">No videos in history</h4>
        )}
        {historyVideos.map((video) => (
          <VideoCard key={video._id} video={video} history={true} />
        ))}
      </div>
    </div>
  );
};

export default History;
