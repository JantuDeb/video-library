import React, { createContext, useContext, useEffect, useReducer } from "react";
import { axiosInstance } from "../../utils/axios-instance";
import {
  ADD_TO_HISTORY,
  GET_HISTORY_VIDEOS,
  historyReducer,
  REMOVE_FROM_HISTORY,
} from "./history-reducer";

const HistoryVideoContext = createContext([]);
const HistoryVideoProvider = ({ children }) => {
  const [historyVideos, historyDispatch] = useReducer(historyReducer, []);

  /**
   * Get historyvideos from api
   */
  const getHistoryVideos = async () => {
    try {
      const { data } = await axiosInstance.get("/user/history");
      if (data.success) {
        const historyVideos = data.histories.map((history) => history.video);
        historyDispatch({
          type: GET_HISTORY_VIDEOS,
          payload: historyVideos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Add videos to history
   */
  const addToHistory = async (videoId) => {
    if (historyVideos.some((video) => video._id === videoId)) return;
    try {
      const { data } = await axiosInstance.post("/user/history", {
        videoId,
      });

      if (data.success)
        historyDispatch({
          type: ADD_TO_HISTORY,
          payload: {
            ...data.history.video,
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete a video from history
   */
  const removeFromHistory = async (videoId) => {
    try {
      const { data } = await axiosInstance.delete(`/user/history/${videoId}`);
      if (data.success)
        historyDispatch({
          type: REMOVE_FROM_HISTORY,
          payload: { _id: data.history.video },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistories = async () => {
    const { data } = await axiosInstance.delete(`/user/history`);
    if (data.success)
      historyDispatch({
        type: REMOVE_FROM_HISTORY,
      });
  };

  useEffect(() => {
    getHistoryVideos();
  }, []);

  return (
    <HistoryVideoContext.Provider
      value={{
        historyVideos,
        addToHistory,
        removeFromHistory,
        deleteHistories,
      }}
    >
      {children}
    </HistoryVideoContext.Provider>
  );
};
const useHistoryVideos = () => useContext(HistoryVideoContext);
export { HistoryVideoProvider, useHistoryVideos };
