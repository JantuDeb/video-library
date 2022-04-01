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
import { useHistoryVideos } from "../../context/history/HistoryContext";
import { useLikedVideos } from "../../context/liked-videos/LikedVideoContext";
const VideoDetails = () => {
  const [video, setVideo] = useState({});
  const [searchparams] = useSearchParams();
  const { addToHistory } = useHistoryVideos();
  const { addToLikes, likedVideos, removeFromLikes } = useLikedVideos();

  const videoId = searchparams.get("videoId");

  const getVideo = async () => {
    const { data } = await axiosInstance.get("/video/" + videoId);
    if (data.success) setVideo(data.video);
  };

  const updateViewCount = async () => {
    try {
      await axiosInstance.patch("/video/" + videoId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      getVideo();
      addToHistory(videoId);
      updateViewCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const { title, channelTitle, statistics, description, createdAt, videoURL } =
    video;
  const { videos } = useVideos();
  const isLiked = likedVideos.some((video) => video._id === videoId);

  const likeDislikeClickHandler = () =>
    isLiked ? removeFromLikes(videoId) : addToLikes(videoId);

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
                  <BiLike
                    size={20}
                    color={isLiked ? "blue" : "white"}
                    onClick={likeDislikeClickHandler}
                  />
                  {statistics?.likeCount}
                </span>
                <span className="flex items-center gap-1 pointer">
                  <RiShareForwardLine size={20} /> SHARE
                </span>
                <span className="flex items-center gap-1 pointer">
                  <RiPlayListAddFill  size={20}/>
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
