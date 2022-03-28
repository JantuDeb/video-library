import React from "react";
import { Link } from "react-router-dom";

const HorizontalVideoCard = () => {
  return (
    <div className="flex">
      <Link to="/video?id=454637" className="card-top m-1">
        <img
          src="https://i.ytimg.com/an_webp/HD3k1hgbUXQ/mqdefault_6s.webp?du=3000&sqp=CMDbgZIG&rs=AOn4CLChoGoPRLC9QiNSG_EoEJGhVqnlmw"
          alt="This Tablet Comes with Windows 11 - OLED Display !"
          className="img-fluid"
          width="350px"
        />
        <span className="duration">9:28</span>
      </Link>
      <div className="card-info flex-col m-1">
        <Link to="/video?id=454637" className="video-title">
          The Most Powerful Computers You've Never Heard Of
        </Link>
        <p className="m-0 text-gray">Amplitude</p>
        <div className="flex text-gray">
          <span className="views">905k views </span>
          <span>10 months ago</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideoCard;
