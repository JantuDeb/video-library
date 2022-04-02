import React, { createContext, useContext, useEffect, useReducer } from "react";
import { axioxPrivate } from "../../utils/axios-instance";
import {
  ADD_TO_LIKE,
  DELETE_ALL_LIKES,
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
      const { data } = await axioxPrivate.get("/user/likes");
      if (data.success) {
        const likedVideos = data.likes.map((like) => like.video);
        likeDispatch({ type: GET_LIKED_VIDEOS, payload: likedVideos });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Add videos to like list
   */
  const addToLikes = async (videoId) => {
    try {
      const { data } = await axioxPrivate.post("/user/likes", {
        videoId,
      });

      if (data.success)
        likeDispatch({
          type: ADD_TO_LIKE,
          payload: {
            ...data.like.video,
          },
        });

      console.log(data.like.video);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete a video from likes
   */
  const removeFromLikes = async (videoId) => {
    try {
      const { data } = await axioxPrivate.delete(`/user/like/${videoId}`);
      if (data.success)
        likeDispatch({
          type: REMOVE_FROM_LIKE,
          payload: { _id: data.like.video },
        });
      console.log(data.like.video);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Delete all likes
   */
  const deleteAllLikes = async () => {
    try {
      const { data } = await axioxPrivate.delete("/user/likes");
      if (data.success)
        likeDispatch({
          type: DELETE_ALL_LIKES,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <LikedVideoContext.Provider
      value={{
        likedVideos,
        addToLikes,
        removeFromLikes,
        deleteAllLikes,
      }}
    >
      {children}
    </LikedVideoContext.Provider>
  );
};
const useLikedVideos = () => useContext(LikedVideoContext);
export { LikedVideoProvider, useLikedVideos };
