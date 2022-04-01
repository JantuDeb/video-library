import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import VideoPlayer from "../../components/player/VideoPlayer";
import HorizontalVideoCard from "../../components/shared/video-card/HorizontalVideoCard";
import "./VideoDetails.css";
import { BiLike } from "react-icons/bi";
import { RiPlayListAddFill, RiShareForwardLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axios-instance";
import { formatedDate } from "../../utils/utils";
import ChannelAvatar from "../../components/shared/ChannelAvatar";
import ChannelInfo from "../../components/shared/ChannelInfo";
import { useVideos } from "../../context/videos/VideoContext";
const VideoDetails = () => {
  const [video, setVideo] = useState({});
  const [searchparams] = useSearchParams();
  const videoId = searchparams.get("videoId");

  const getVideo = async () => {
    const { data } = await axiosInstance.get("/video/" + videoId);
    if (data.success) setVideo(data.video);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getVideo(), [videoId]);
  const { title, channelTitle, statistics, description, createdAt, videoURL } = video;
  const { videos } = useVideos();

  return (
    <>
      <Navbar />
      <div className="flex video-details">
        {video && (
          <div className="video-wrapper">
            <VideoPlayer url={videoURL?.url} />
            <ul className="list-unstyled flex text-blue gap-1 m-0 wrap">
              {video.tags?.map((tag) => (
                <li className="tag">#{tag}</li>
              ))}
            </ul>
            <h6>{title}</h6>
            <div className="flex py-2 justify-between wrap items-center">
              <div className="flex text-gray">
                <span className="views">{statistics?.viewCount} views </span>
                <span>{createdAt && formatedDate(createdAt)}</span>
              </div>
              <div className="flex gap-2 items-center justify-between p-2">
                <span className="flex items-center gap-1 pointer">
                  <BiLike /> {statistics?.likeCount}
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
                <ChannelAvatar />
                <div>
                  <ChannelInfo channelTitle={channelTitle} />
                  <p className="description">{description}</p>
                </div>
                <button className="btn-grad-red item-start radius-md">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="recomended-videos">
          {videos.slice(0, 5).map((video) => (
            <HorizontalVideoCard video={video} key={video._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
