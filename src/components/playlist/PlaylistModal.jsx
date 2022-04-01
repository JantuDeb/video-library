import React from "react";
import { MdClose } from "react-icons/md";
import { usePlaylist } from "../../context/playlist/PlaylistContext";
import PlaylistInputForm from "../shared/PlaylistInputForm";

const PlaylistModal = ({ setShowModal, videoId }) => {
  const { playlists, createPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylist();
    
  const createPlaylistHandler = (name) => {
    createPlaylist({ name });
  };

  const updatePlaylist = (e, playlistId) => {
    if (e.target.checked) addToPlaylist({ playlistId, videoId });
    else removeFromPlaylist({ playlistId, videoId });
  };

  return (
    <div className="flex-col add-play-card p-2">
      <div className="flex justify-between">
        <span className="font-medium">Save to...</span>
        <MdClose onClick={() => setShowModal((v) => !v)} />
      </div>
      <div className="flex-col">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="flex items-center gap-1">
            <input
              type="checkbox"
              id={playlist._id}
              onChange={(e) => updatePlaylist(e, playlist._id)}
            />
            <label htmlFor={playlist._id}> {playlist.name}</label>
          </div>
        ))}
        <PlaylistInputForm createPlaylistHandler={createPlaylistHandler} />
      </div>
    </div>
  );
};

export default PlaylistModal;
