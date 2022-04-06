import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios-instance";
import { useAuth } from "../auth/AuthContext";
import {
  ADD_TO_HISTORY,
  DELETE_HISTORY,
  GET_HISTORY_VIDEOS,
  historyReducer,
  REMOVE_FROM_HISTORY,
} from "./history-reducer";

const HistoryVideoContext = createContext([]);
const HistoryVideoProvider = ({ children }) => {
  const [historyVideos, historyDispatch] = useReducer(historyReducer, []);

  const { authState } = useAuth();
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
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Add videos to history
   */
  const addToHistory = async (videoId) => {
    if (!authState.isLogedIn) return;

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
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Delete a video from history
   */
  const removeFromHistory = async (videoId) => {
    try {
      const { data } = await axiosInstance.delete(`/user/history/${videoId}`);
      if (data.success) {
        historyDispatch({
          type: REMOVE_FROM_HISTORY,
          payload: { _id: data.history.video },
        });
        toast.dark("Removed from history", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  const deleteHistories = async () => {
    try {
      const { data } = await axiosInstance.delete(`/user/history`);
      if (data.success) {
        historyDispatch({
          type: DELETE_HISTORY,
        });
        toast.dark("Removed all histories", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getHistoryVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HistoryVideoContext.Provider
      value={{
        historyVideos,
        addToHistory,
        removeFromHistory,
        deleteHistories,
        getHistoryVideos,
      }}
    >
      {children}
    </HistoryVideoContext.Provider>
  );
};
const useHistoryVideos = () => useContext(HistoryVideoContext);
export { HistoryVideoProvider, useHistoryVideos };
