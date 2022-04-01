import React from "react";
import { Link } from "react-router-dom";

const ChannelInfo = ({ channelTitle }) => {
  return (
    <>
      <Link to="/video?id=454637" className="video-title">
        {channelTitle}
      </Link>
      <p className="m-0 text-gray">11.5M subscribers</p>
    </>
  );
};

export default ChannelInfo;
