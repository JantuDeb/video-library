import React, { useState } from "react";
import { MdThumbDown, MdThumbUp, MdVideoLibrary } from "react-icons/md";
import { RiPlayList2Line, RiShareForwardLine } from "react-icons/ri";
import { useLikedVideos } from "../../../context/liked-videos/LikedVideoContext";
import { usePlaylist } from "../../../context/playlist/PlaylistContext";
import PlaylistModal from "../../playlist/PlaylistModal";
import DropdownMenu from "../DropdownMenu";
import Modal from "../modal/Modal";

const VideoCardActionMenu = ({ videoId, playlistId, isInLiked }) => {
  const { addToLikes, removeFromLikes } = useLikedVideos();
  const [showModal, setShowModal] = useState(false);
  const { removeFromPlaylist } = usePlaylist();

  const addToPlayList = (id) => {
    if (!playlistId) setShowModal((v) => !v);
    else removeVideoHandler(videoId, playlistId);
  };

  const likeDislikeClickHandler = () => {
    if (isInLiked) removeFromLikes(videoId);
    else addToLikes(videoId);
  };

  const removeVideoHandler = (videoId, playlistId) => {
    if (videoId || playlistId) removeFromPlaylist({ playlistId, videoId });
  };

  return (
    <>
      <DropdownMenu>
        <div
          className="flex items-center gap-1 pointer"
          onClick={() => console.log(videoId)}
        >
          <MdVideoLibrary size={20} />
          <span className="item-text">Add to watch Later</span>
        </div>

        <div
          aria-label="like or dislike element"
          className="flex items-center gap-1 pointer"
          onClick={likeDislikeClickHandler}
        >
          {isInLiked ? <MdThumbDown size={20} /> : <MdThumbUp size={20} />}
          <span className="item-text">
            {isInLiked ? "Remove from Liked Videos" : "Add to Liked Videos"}
          </span>
        </div>

        <div
          className="flex items-center gap-1 pointer"
          onClick={
            () => addToPlayList() /* updatePlaylist(videoId, playlistId)*/
          }
        >
          <RiPlayList2Line size={20} />
          <span className="item-text">
            {playlistId ? "Remove from playlist" : "Add to playlist"}
          </span>
        </div>
        <div
          className="flex items-center gap-1 pointer"
          onClick={() => console.log("Share " + videoId)}
        >
          <RiShareForwardLine /> <span className="item-text">Share</span>
        </div>
      </DropdownMenu>
      <Modal show={showModal}>
        <PlaylistModal setShowModal={setShowModal} videoId={videoId} />
      </Modal>
    </>
  );
};

export default VideoCardActionMenu;
