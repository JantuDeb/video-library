import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css"
const VideoCard = () => {
  return (
    <div className="v-card">
      <Link to="/video?id=454637"  className="card-top">
        <img
          src="https://i.ytimg.com/vi/9VdJG4uKo8M/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDi_kySKGD1Lh-As6vM9DrlzN7FvQ"
          alt="This Tablet Comes with Windows 11 - OLED Display !"
          className="img-fluid"
        />
        <span className="duration">9:28</span>
      </Link>
      <div className="card-info flex">
        <Link to="/channel/:id" className="channel">
          <img
            className="avatar-small "
            src="https://yt3.ggpht.com/ytc/AKedOLTms-6p1_2cRI4fjiy0RpXYsoJrMFnmRbHKVkYO=s68-c-k-c0x00ffffff-no-rj"
            alt="channel avatar"
          />
        </Link >
        <div>
          <Link to="/video?id=454637" className="video-title">This Tablet Comes with Windows 11 - OLED Display !</Link>
          <p className="m-0 text-gray">Amplitude</p>
          <div className="flex text-gray">
            <span className="views">905k views </span> <span>10 months ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
