import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";
const VideoPlayer = ({ url }) => {
  return <ReactPlayer url={url} className="react-player" width="100%" height="100%"  controls onReady={()=>console.log("ready")}/>;
};

export default VideoPlayer;
