import React, { useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdClose, MdDelete } from "react-icons/md";
import PlaylistInputForm from "../../components/shared/PlaylistInputForm";
import VideoCard from "../../components/shared/VideoCard";
import { usePlaylist } from "../../context/playlist/PlaylistContext";
import "./Playlist.css";
const Playlist = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState({ status: false, id: "" });
  const {
    playlists,
    createPlaylist,
    editPlaylist,
    removeFromPlaylist,
    deletePlaylist,
  } = usePlaylist();
  const createPlaylistHandler = (name) => {
    createPlaylist({ name });
    setIsCreating(false);
  };

  const editPlaylistHandler = (name) => {
    editPlaylist({ name, playlistId: isEditing.id });
    setIsEditing({ status: false, id: "" });
  };

  const removeVideoHandler = (videoId, playlistId) => {
    if (videoId || playlistId) removeFromPlaylist({ playlistId, videoId });
  };

  const deleteClickHandler = (playlistId) => deletePlaylist({ playlistId });

  return (
    <div className="container">
      <div className="flex justify-between">
        {isCreating ? (
          <span className="p-1 m-1 bg-secondary flex items-center ">
            <PlaylistInputForm createPlaylistHandler={createPlaylistHandler} />
            <MdClose
              className="m-1 pointer"
              size={20}
              onClick={() => setIsCreating(false)}
            />
          </span>
        ) : (
          <button
            className="transparent text-blue flex center p-0"
            onClick={() => setIsCreating((v) => !v)}
          >
            <BiPlus size={20} /> New Playlist
          </button>
        )}
        <select className="m-1 border-0">
          <option value="az">A-Z</option>
          <option value="newest">Dated New</option>
          <option value="old">Dated Old</option>
        </select>
      </div>

      <div className="flex-col p-2">
        {playlists.map((playlist) => {
          return (
            <section key={playlist._id} className="border-bottom py-1">
              {isEditing.status && isEditing.id === playlist._id ? (
                <span className="p-1 m-1 bg-secondary flex items-center ">
                  <PlaylistInputForm
                    createPlaylistHandler={editPlaylistHandler}
                    initialValue={playlist.name}
                  />
                </span>
              ) : (
                <div className="flex items-center py-2 gap-1">
                  <span>{playlist.name}</span>
                  <BiEdit
                    size={20}
                    className="pointer text-blue"
                    onClick={() =>
                      setIsEditing((v) => ({
                        ...v,
                        status: true,
                        id: playlist._id,
                      }))
                    }
                  />
                  <MdDelete
                    size={20}
                    className="pointer text-red"
                    onClick={()=>deleteClickHandler(playlist._id)}
                  />
                </div>
              )}
              <div className="flex gap-2 playlist h-scroll">
                {playlist.videos.map((video) => (
                  <VideoCard
                    video={video}
                    key={video._id}
                    playlistId={playlist._id}
                    updatePlaylist={removeVideoHandler}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
