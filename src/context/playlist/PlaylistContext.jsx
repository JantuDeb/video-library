import React, { createContext, useContext, useEffect, useReducer } from "react";
import { axioxPrivate } from "../../utils/axios-instance";
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
      const { data } = await axioxPrivate.get("/user/playlists");
      if (data.success)
        playlistDispatch({ type: GET_PLAYLISTS, payload: data.playlists });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Create a new playlist
   */
  const createPlaylist = async ({ name, description }) => {
    try {
      const { data } = await axioxPrivate.post("/user/playlists", {
        name,
        description,
      });
      if (data.success)
        playlistDispatch({ type: CREATE_PLAYLIST, payload: data.playlist });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Edit playlist Name or description
   */
  const editPlaylist = async ({ name, description, playlistId }) => {
    try {
      const { data } = await axioxPrivate.patch(
        `/user/playlist/${playlistId}`,
        {
          name,
          description,
        }
      );
      if (data.success)
        playlistDispatch({ type: UPDATE_PLAYLIST, payload: data.playlist });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Add videos to playlist
   */
  const addToPlaylist = async ({ playlistId, videoId }) => {
    try {
      const { data } = await axioxPrivate.put("/user/playlists", {
        playlistId,
        videoId,
      });
      if (data.success)
        playlistDispatch({ type: ADD_TO_PLAYLIST, payload: data.playlist });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete videos to playlist
   */
  const removeFromPlaylist = async ({ playlistId, videoId }) => {
    try {
      const { data } = await axioxPrivate.delete(
        `/user/playlist/${playlistId}/${videoId}`
      );
      if (data.success)
        playlistDispatch({
          type: REMOVE_FROM_PLAYLIST,
          payload: { playlist: data.playlist, videoId },
        });
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Delete a playlist
   */
  const deletePlaylist = async ({ playlistId }) => {
    try {
      const { data } = await axioxPrivate.delete(
        `/user/playlist/${playlistId}`
      );
      if (data.success)
        playlistDispatch({
          type: DELETE_PLAYLIST,
          payload: data.playlist,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylist();
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
        deletePlaylist
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { PlaylistProvidder, usePlaylist };