import React from "react";
import { Link } from "react-router-dom";
import ChannelAvatar from "../../channel/ChannelAvatar";
import VideoCardActionMenu from "./VideoCardActionMenu";
import "./VideoCard.css";
import { MdClose } from "react-icons/md";
import { useHistoryVideos } from "../../../context/history/HistoryContext";
const VideoCard = ({ video, playlistId, history }) => {
  const { thumbnails, title, channelTitle, statistics, duration, _id } = video;
  const { removeFromHistory } = useHistoryVideos();
  return (
    <div className="v-card history">
      {history && (
        <span className="history-close-icon flex center pointer">
          <MdClose size={20} onClick={() => removeFromHistory(_id)} />
        </span>
      )}
      <Link to={`/video?videoId=${_id}`} className="card-top">
        <img
          src={thumbnails?.url}
          alt="This Tablet Comes with Windows 11 - OLED Display !"
          className="img-fluid"
        />
        <span className="duration">{duration}</span>
      </Link>
      <div className="card-info flex justify-between">
        <ChannelAvatar />
        <div className="grow">
          <Link to={`/video?videoId=${_id}`} className="video-title">
            {title}
          </Link>
          <p className="m-0 text-gray">{channelTitle}</p>
          <div className="flex text-gray">
            <span className="views">{statistics?.viewCount} views </span>
            <span>10 months ago</span>
          </div>
        </div>
        <VideoCardActionMenu videoId={_id} playlistId={playlistId} />
      </div>
    </div>
  );
};

export default VideoCard;
