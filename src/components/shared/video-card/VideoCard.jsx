import React from "react";
import { Link } from "react-router-dom";
import ChannelAvatar from "../ChannelAvatar";
import VideoCardActionMenu from "./VideoCardActionMenu";
import "./VideoCard.css";
const VideoCard = ({ video, playlistId }) => {
  const { thumbnails, title, channelTitle, statistics, duration, _id } = video;

  return (
    <div className="v-card">
      <Link to={`/video?videoId=${_id}`} className="card-top">
        <img
          src={thumbnails?.url}
          alt="This Tablet Comes with Windows 11 - OLED Display !"
          className="img-fluid"
        />
        <span className="duration">{duration}</span>
      </Link>
      <div className="card-info flex justify-between">
        <ChannelAvatar/>
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
