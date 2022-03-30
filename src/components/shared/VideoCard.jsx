import React from "react";
import { MdVideoLibrary } from "react-icons/md";
import { RiPlayList2Line, RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import "./VideoCard.css";
const VideoCard = ({ video , addToPlayList}) => {
  const { thumbnails, title, channelTitle, statistics, duration, id } = video;
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
        <div>
          <DropdownMenu>
            <div
              className="flex items-center gap-1 pointer"
              onClick={() => console.log(id)}
            >
              <MdVideoLibrary size={20} />
              <span className="item-text">Add to watch Later</span>
            </div>

            <div
              className="flex items-center gap-1 pointer"
              onClick={() =>addToPlayList(id) }
            >
              <RiPlayList2Line size={20} />
              <span className="item-text">Add to playlist</span>
            </div>
            <div
              className="flex items-center gap-1 pointer"
              onClick={() => console.log("Share " + id)}
            >
              <RiShareForwardLine /> <span className="item-text">Share</span>
            </div>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
