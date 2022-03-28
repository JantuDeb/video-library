import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./VideoCard.css";
const VideoCard = ({ video }) => {
  const { thumbnails, title, channelTitle, statistics, duration } = video;
  return (
    <div className="v-card">
      <Link to="/video?id=454637" className="card-top">
        <img
          src={thumbnails?.url}
          alt="This Tablet Comes with Windows 11 - OLED Display !"
          className="img-fluid"
        />
        <span className="duration">{duration}</span>
      </Link>
      <div className="card-info flex">
        <Link to="/channel/:id" className="channel">
          <img
            className="avatar-small "
            src="https://yt3.ggpht.com/ytc/AKedOLTms-6p1_2cRI4fjiy0RpXYsoJrMFnmRbHKVkYO=s68-c-k-c0x00ffffff-no-rj"
            alt="channel avatar"
          />
        </Link>
        <div>
          <Link to="/video?id=454637" className="video-title">
            {title}
          </Link>

          <p className="m-0 text-gray">{channelTitle}</p>
          <div className="flex text-gray">
            <span className="views">{statistics?.viewCount} views </span>
            <span>10 months ago</span>
          </div>
        </div>
        <button className="transparent p-0 radius-full text-white">
          <BiDotsVerticalRounded size={20} />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
