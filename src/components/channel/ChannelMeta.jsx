import React from "react";
import { Link } from "react-router-dom";
import ChannelAvatar from "./ChannelAvatar";

const ChannelMeta = ({ channelTitle }) => {
  return (
    <div className="flex items-start py-2 border-top border-bottom justify-between w-full">
      <div className="flex items-center">
        <ChannelAvatar />
        <div>
          <Link to="/video?id=454637" className="video-title">
            {channelTitle}
          </Link>
          <p className="m-0 text-gray">11.5M subscribers</p>
        </div>
      </div>
      <button className="btn-grad-red item-start radius-md">SUBSCRIBE</button>
    </div>
  );
};

export default ChannelMeta;
