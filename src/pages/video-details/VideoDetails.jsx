import React from "react";
import Navbar from "../../components/navbar/Navbar";
import VideoPlayer from "../../components/player/VideoPlayer";
import HorizontalVideoCard from "../../components/shared/HorizontalVideoCard";
import "./VideoDetails.css";
import { BiLike, BiDislike } from "react-icons/bi";
import { RiPlayListAddFill, RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const VideoDetails = () => {
  return (
    <>
      <Navbar />
      <div className="flex video-details">
        <div className="video-wrapper">
          <VideoPlayer url="https://www.youtube.com/watch?v=GVsUOuSjvcg" />
          <ul className="list-unstyled flex text-blue gap-1 m-0">
            <li>#java</li>
            <li>#javascript</li>
            <li>#react</li>
            <li>#css</li>
            <li>#html</li>
            <li>#java</li>
          </ul>
          <div>Future Computers Will Be Radically Different</div>
          <div className="flex py-2 justify-between wrap items-center">
            <div className="flex text-gray">
              <span className="views">905k views </span>
              <span>19 Nov 2021</span>
            </div>
            <div className="flex gap-2 items-center justify-between p-2">
              <span className="flex items-center gap-1 pointer">
                <BiLike /> 475K
              </span>
              <span className="flex items-center gap-1 pointer">
                <BiDislike /> 20K
              </span>
              <span className="flex items-center gap-1 pointer">
                <RiShareForwardLine /> SHARE
              </span>
              <span className="flex items-center gap-1 pointer">
                <RiPlayListAddFill />
                SAVE
              </span>
            </div>
            <div className="flex items-start py-2 border-top border-bottom">
              <Link to="/channel/:id" className="channel">
                <img
                  className="avatar-small "
                  src="https://yt3.ggpht.com/ytc/AKedOLTms-6p1_2cRI4fjiy0RpXYsoJrMFnmRbHKVkYO=s68-c-k-c0x00ffffff-no-rj"
                  alt="channel avatar"
                />
              </Link>
              <div>
                <Link to="/video?id=454637" className="video-title">
                  Computers
                </Link>
                <p className="m-0 text-gray">11.5M subscribers</p>
                <p>
                  Analog computers were the most powerful computers for
                  thousands of years, relegated to obscurity by the digital
                  revolution. Analog computers were the most powerful computers
                  for thousands of years, relegated to obscurity by the digital
                  revolution.
                </p>
              </div>
              <button className="btn-grad-red item-start radius-md">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="recomended-videos">
          {[...Array(10)].map((item) => (
            <HorizontalVideoCard />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
