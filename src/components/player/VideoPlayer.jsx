import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
const VideoPlayer = ({ url }) => {
  return <ReactPlayer url={url} className="react-player" width="100%"/>;
};

export default VideoPlayer;
