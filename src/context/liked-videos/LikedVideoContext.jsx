import { toast } from "react-toastify";
import React, { createContext, useContext, useReducer } from "react";

import { axiosInstance } from "../../utils/axios-instance";
import {
  ADD_TO_LIKE,
  GET_LIKED_VIDEOS,
  likedVideoReducer,
  REMOVE_FROM_LIKE,
} from "./liked-video-reducer";
const LikedVideoContext = createContext([]);
const LikedVideoProvider = ({ children }) => {
  const [likedVideos, likeDispatch] = useReducer(likedVideoReducer, []);
  /**
   * Get liked videos from api
   */
  const getLikedVideos = async () => {
    try {
      const { data } = await axiosInstance.get("/user/likes");
      if (data.success) {
        const likedVideos = data.likes.map((like) => like.video);
        likeDispatch({ type: GET_LIKED_VIDEOS, payload: {likedVideos} });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Add videos to like list
   */
  const addToLikes = async (videoId) => {
    try {
      const { data } = await axiosInstance.post("/user/likes", {
        videoId,
      });

      if (data.success) {
        likeDispatch({
          type: ADD_TO_LIKE,
          payload: {
            ...data.like.video,
          },
        });
        toast.dark("Added to liked videos", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Delete a video from likes
   */
  const removeFromLikes = async (videoId) => {
    try {
      const { data } = await axiosInstance.delete(`/user/like/${videoId}`);
      if (data.success) {
        likeDispatch({
          type: REMOVE_FROM_LIKE,
          payload: { _id: data.like.video },
        });
        toast.dark("Removed from liked videos", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  // useEffect(() => {
  //   getLikedVideos();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <LikedVideoContext.Provider
      value={{
        likedVideos,
        addToLikes,
        removeFromLikes,
        getLikedVideos
      }}
    >
      {children}
    </LikedVideoContext.Provider>
  );
};
const useLikedVideos = () => useContext(LikedVideoContext);
export { LikedVideoProvider, useLikedVideos };
