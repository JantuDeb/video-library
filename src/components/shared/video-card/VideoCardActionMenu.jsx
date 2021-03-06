import React, { useState } from "react";
import { MdThumbDown, MdThumbUp, MdVideoLibrary } from "react-icons/md";
import { RiPlayList2Line } from "react-icons/ri";
import { useLikedVideos } from "../../../context/liked-videos/LikedVideoContext";
import { usePlaylist } from "../../../context/playlist/PlaylistContext";
import { useWatchLaterVideos } from "../../../context/watch-later/WatchLaterVideoContext";
import PlaylistModal from "../../playlist/PlaylistModal";
import DropdownMenu from "./DropdownMenu";
import Modal from "../modal/Modal";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast } from "react-toastify";

const VideoCardActionMenu = ({ videoId, playlistId }) => {
  const { addToLikes, removeFromLikes, likedVideos } = useLikedVideos();
  const [showModal, setShowModal] = useState(false);
  const { removeFromPlaylist, getPlaylist, playlists } = usePlaylist();
  const { watchLaterVideos, addToWatchLater, removeFromWatchLater } =
    useWatchLaterVideos();

  const { authState } = useAuth();
  const isLiked = likedVideos.some((video) => video._id === videoId);

  const isInWatchLater = watchLaterVideos.some(
    (video) => video._id === videoId
  );

  const addToPlayListClickHandler = () => {
    if (!authState.isLogedIn)
      return toast.error("You need to login first");
    if (playlists.length === 0) getPlaylist();
    if (!playlistId) setShowModal((v) => !v);
    else removeVideoHandler(videoId, playlistId);
  };

  const likeDislikeClickHandler = () => {
    if (!authState.isLogedIn)
      return toast.error("You need to login first");
    isLiked ? removeFromLikes(videoId) : addToLikes(videoId);
  };

  const removeVideoHandler = (videoId, playlistId) =>
    playlistId && removeFromPlaylist({ playlistId, videoId });

  const watchLaterClickHandler = () => {
    if (!authState.isLogedIn)
      return toast.error("You need to login first");
    isInWatchLater ? removeFromWatchLater(videoId) : addToWatchLater(videoId);
  };

  return (
    <>
      <DropdownMenu>
        <div
          aria-label="add to watch later or remove from watch later "
          className="flex items-center gap-1 pointer"
          onClick={watchLaterClickHandler}
        >
          <MdVideoLibrary size={20} />
          <span className="item-text">
            {!isInWatchLater ? "Add to watch Later" : "Remove from watch Later"}
          </span>
        </div>

        <div
          aria-label="like or dislike element"
          className="flex items-center gap-1 pointer"
          onClick={likeDislikeClickHandler}
        >
          {isLiked ? <MdThumbDown size={20} /> : <MdThumbUp size={20} />}
          <span className="item-text">
            {isLiked ? "Remove from Liked Videos" : "Add to Liked Videos"}
          </span>
        </div>

        <div
          className="flex items-center gap-1 pointer"
          onClick={addToPlayListClickHandler}
        >
          <RiPlayList2Line size={20} />
          <span className="item-text">
            {playlistId ? "Remove from playlist" : "Add to playlist"}
          </span>
        </div>
        {/* <div className="flex items-center gap-1 pointer">
          <RiShareForwardLine /> <span className="item-text">Share</span>
        </div> */}
      </DropdownMenu>
      <Modal show={showModal}>
        <PlaylistModal setShowModal={setShowModal} videoId={videoId} />
      </Modal>
    </>
  );
};

export default VideoCardActionMenu;
