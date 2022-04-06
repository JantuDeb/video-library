import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios-instance";
import {
  ADD_NOTE,
  DELETE_NOTE,
  ERROR,
  GET_CURRENT_VIDEO,
  GET_NOTE,
  GET_VIDEOS,
  LOADING,
  UPDATE_VIEW_COUNT,
  videoReducer,
} from "./video-reducer";

const VideoContext = createContext([]);
const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, {
    videos: [],
    currentVideo: {},
    loading: false,
    error: "",
    currentCategory: "",
    searchQuery: "",
  });
  const [categories, setCategories] = useState([]);
  const { currentVideo, videos } = videoState;
  /**
   * GET VIDEOS, CATEGORY FORM API
   */
  const getVideos = async () => {
    videoDispatch({ type: LOADING, payload: { loading: true } });
    try {
      const [videoResponse, categoryResponse] = await Promise.all([
        axiosInstance.get("/videos"),
        axiosInstance.get("/categories"),
      ]);
      videoDispatch({
        type: GET_VIDEOS,
        payload: {
          videos: videoResponse.data.videos,
        },
      });
      setCategories(categoryResponse.data.categories);
    } catch (error) {
      videoDispatch({ type: ERROR, payload: { error: error.message } });
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    } finally {
      videoDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  const getVideo = async (videoId) => {
    videoDispatch({ type: LOADING, payload: { loading: true } });
    try {
      const { data } = await axiosInstance.get("/video/" + videoId);
      if (data.success)
        videoDispatch({
          type: GET_CURRENT_VIDEO,
          payload: {
            video: data.video,
          },
        });
    } catch (error) {
      videoDispatch({ type: ERROR, payload: { error: error.message } });
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    } finally {
      videoDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  const updateViewCount = async (videoId) => {
    if (Object.keys(currentVideo).length > 0) {
      videoDispatch({
        type: UPDATE_VIEW_COUNT,
        payload: {
          videoId,
          count: 1,
        },
      });
      try {
        await axiosInstance.patch("/video/" + videoId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addNote = async ({ note, videoId }) => {
    videoDispatch({ type: ADD_NOTE, payload: { note } });
    toast.dark("Note added successfully", { autoClose: 2000 });
    try {
      await axiosInstance.post("/video/note/" + videoId, { note });
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  const getNote = async (videoId) => {
    try {
      const { data } = await axiosInstance.get("/video/note/" + videoId);
      videoDispatch({ type: GET_NOTE, payload: { note: data.note.note } });
    } catch (error) {
      videoDispatch({ type: GET_NOTE, payload: { note: "" } });
    }
  };

  const deleteNote = async (videoId) => {
    videoDispatch({ type: DELETE_NOTE });
    toast.dark("Note deleted successfully", { autoClose: 2000 });
    try {
      await axiosInstance.delete("/video/note/" + videoId);
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const filterVideosByCategory = videos.filter((video) =>
    videoState.currentCategory === ""
      ? true
      : video.category === videoState.currentCategory
  );

  const filterVideosBySearch = filterVideosByCategory.filter((video) =>
    videoState.searchQuery==="" ||videoState.searchQuery===null
      ? true
      : video.title.toLowerCase().includes(videoState.searchQuery.toLowerCase())
  );

  return (
    <VideoContext.Provider
      value={{
        videos: filterVideosBySearch,
        categories,
        video: currentVideo,
        getVideo,
        updateViewCount,
        videoDispatch,
        addNote,
        deleteNote,
        getNote,
        videoState,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideos = () => useContext(VideoContext);
export { VideoProvider, useVideos };
