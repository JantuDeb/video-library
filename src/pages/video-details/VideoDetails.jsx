import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import VideoPlayer from "../../components/player/VideoPlayer";
import "./VideoDetails.css";
import { BiLike } from "react-icons/bi";
import { RiPlayListAddFill, RiShareForwardLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { formatedDate } from "../../utils/utils";
import { useHistoryVideos } from "../../context/history/HistoryContext";
import { useLikedVideos } from "../../context/liked-videos/LikedVideoContext";
import RecommendedVideos from "../../components/shared/RecommendedVideos";
import ChannelMeta from "../../components/channel/ChannelMeta";
import VideoNote from "../../components/VideoNote";
import { useVideos } from "../../context/videos/VideoContext";
import { UPDATE_LIKE_COUNT } from "../../context/videos/video-reducer";
import Loader from "../../components/loader/Loader";
const VideoDetails = () => {
  const [searchparams] = useSearchParams();
  const { addToHistory } = useHistoryVideos();
  const { addToLikes, likedVideos, removeFromLikes } = useLikedVideos();
  const { video, videoDispatch, getVideo, updateViewCount, getNote, videoState:{loading} } =
    useVideos();
  const videoId = searchparams.get("videoId");

  const {
    title,
    channelTitle,
    statistics,
    description,
    createdAt,
    videoURL,
    note,
  } = video;
  const isLiked = likedVideos.some((video) => video._id === videoId);

  const likeDislikeClickHandler = () => {
    if (isLiked) {
      videoDispatch({
        type: UPDATE_LIKE_COUNT,
        payload: {
          videoId,
          count: -1,
        },
      });
      removeFromLikes(videoId);
    } else {
      videoDispatch({
        type: UPDATE_LIKE_COUNT,
        payload: {
          videoId,
          count: 1,
        },
      });
      addToLikes(videoId);
    }
  };

  useEffect(() => {
    if (videoId) {
      getVideo(videoId);
      addToHistory(videoId);
    }
    if (video) {
      updateViewCount(videoId);
      getNote(videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <>
      <Navbar hideHamburgerMenu />
      <div className="flex video-details">
        {(!video||loading) && <Loader/>}
        {video && (
          <div className="video-wrapper">
            <VideoPlayer url={videoURL?.url} />
            <ul className="list-unstyled flex text-blue gap-1 m-0 wrap">
              {video.tags?.map((tag) => (
                <li className="tag">#{tag}</li>
              ))}
            </ul>
            <h6>{title}</h6>
            <div className="flex-col py-2 justify-between wrap items-center">
              <div className="flex justify-between items-center w-full">
                <div className="flex text-gray">
                  <span className="views">{statistics?.viewCount} views </span>
                  <span>{createdAt && formatedDate(createdAt)}</span>
                </div>
                <div className="flex gap-2 items-center justify-between p-2">
                  <span className="flex items-center gap-1 pointer">
                    <BiLike
                      size={20}
                      color={isLiked ? "red" : "white"}
                      onClick={likeDislikeClickHandler}
                    />
                    {statistics?.likeCount}
                  </span>
                  <span className="flex items-center gap-1 pointer">
                    <RiShareForwardLine size={20} /> SHARE
                  </span>
                  <span className="flex items-center gap-1 pointer">
                    <RiPlayListAddFill size={20} />
                    SAVE
                  </span>
                </div>
              </div>
              <ChannelMeta channelTitle={channelTitle} />
              <p className="description p-1 m-0">{description}</p>
            </div>
           <VideoNote note={note} videoId={videoId} />
          </div>
        )}
        <RecommendedVideos currentVideoId={videoId} />
      </div>
    </>
  );
};

export default VideoDetails;
