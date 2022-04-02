import React, { createContext, useContext, useEffect, useReducer } from "react";
import { axiosInstance } from "../../utils/axios-instance";
import {
  ADD_TO_WATCH_LATER,
  GET_WATCH_LATER_VIDEOS,
  REMOVE_FROM_WATCH_LATER,
  watchLaterReducer,
} from "./watch-later-reducer";

const WatchLaterVideoContext = createContext([]);
const WatchLaterVideoProvider = ({ children }) => {
  const [watchLaterVideos, watchLaterDispatch] = useReducer(
    watchLaterReducer,
    []
  );

  /**
   * Get watch later videos from api
   */
  const getWatchLaterVideos = async () => {
    try {
      const { data } = await axiosInstance.get("/user/watch-later");
      if (data.success) {
        const watchLaterVideos = data.watchLaters.map((watch) => watch.video);
        watchLaterDispatch({
          type: GET_WATCH_LATER_VIDEOS,
          payload: watchLaterVideos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Add videos to like list
   */
  const addToWatchLater = async (videoId) => {
    try {
      const { data } = await axiosInstance.post("/user/watch-later", {
        videoId,
      });

      if (data.success)
        watchLaterDispatch({
          type: ADD_TO_WATCH_LATER,
          payload: {
            ...data.watchLater.video,
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete a video from watch later
   */
  const removeFromWatchLater = async (videoId) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/watch-later/${videoId}`
      );
      if (data.success)
        watchLaterDispatch({
          type: REMOVE_FROM_WATCH_LATER,
          payload: { _id: data.watchLater.video },
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatchLaterVideos();
  }, []);

  return (
    <WatchLaterVideoContext.Provider
      value={{
        watchLaterVideos,
        addToWatchLater,
        removeFromWatchLater,
      }}
    >
      {children}
    </WatchLaterVideoContext.Provider>
  );
};
const useWatchLaterVideos = () => useContext(WatchLaterVideoContext);
export { WatchLaterVideoProvider, useWatchLaterVideos };
