import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios-instance";
import {
  ADD_TO_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_PLAYLISTS,
  playlistReducer,
  REMOVE_FROM_PLAYLIST,
  UPDATE_PLAYLIST,
} from "./playlist-reducer";

const PlaylistContext = createContext([]);
const PlaylistProvidder = ({ children }) => {
  const [playlists, playlistDispatch] = useReducer(playlistReducer, []);
  /**
   * Get playlists from api
   */
  const getPlaylist = async () => {
    try {
      const { data } = await axiosInstance.get("/user/playlists");
      if (data.success)
        playlistDispatch({ type: GET_PLAYLISTS, payload: data.playlists });
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Create a new playlist
   */
  const createPlaylist = async ({ name, description }) => {
    try {
      const { data } = await axiosInstance.post("/user/playlists", {
        name,
        description,
      });
      if (data.success) {
        playlistDispatch({ type: CREATE_PLAYLIST, payload: data.playlist });
        toast.dark("Playlist created", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Edit playlist Name or description
   */
  const editPlaylist = async ({ name, description, playlistId }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/user/playlist/${playlistId}`,
        {
          name,
          description,
        }
      );
      if (data.success) {
        toast.dark("Playlist successfully renamed", { autoClose: 2000 });
        playlistDispatch({ type: UPDATE_PLAYLIST, payload: data.playlist });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Add videos to playlist
   */
  const addToPlaylist = async ({ playlistId, videoId }) => {
    try {
      const { data } = await axiosInstance.put("/user/playlists", {
        playlistId,
        videoId,
      });
      if (data.success) {
        playlistDispatch({ type: ADD_TO_PLAYLIST, payload: data.playlist });
        toast.dark("Video added to playlist", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  /**
   * Delete videos to playlist
   */
  const removeFromPlaylist = async ({ playlistId, videoId }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/playlist/${playlistId}/${videoId}`
      );
      if (data.success) {
        playlistDispatch({
          type: REMOVE_FROM_PLAYLIST,
          payload: { playlist: data.playlist, videoId },
        });
        toast.dark("Video removed from playlist", { autoClose: 2000 });
      }
      
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };
  /**
   * Delete a playlist
   */
  const deletePlaylist = async ({ playlistId }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/playlist/${playlistId}`
      );
      if (data.success) {
        playlistDispatch({
          type: DELETE_PLAYLIST,
          payload: data.playlist,
        });
        toast.dark("Playlist successfully deleted", { autoClose: 2000 });
      }
    } catch (error) {
      if (error.response)
        toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        playlistDispatch,
        createPlaylist,
        editPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { PlaylistProvidder, usePlaylist };
