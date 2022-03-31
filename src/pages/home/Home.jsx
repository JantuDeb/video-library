import React, { useState } from "react";
import Categories from "../../components/category/Categories";
import PlaylistModal from "../../components/playlist/PlaylistModal";
import Modal from "../../components/shared/modal/Modal";
import VideoCard from "../../components/shared/VideoCard";
import { useVideos } from "../../context/videos/VideoContext";
import "./Home.css";
const Home = () => {
  const { videos } = useVideos();
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const addToPlayList = (id) => {
    console.log(id);
    setVideoId(id);
    setShowModal((v) => !v);
  };

  return (
    <div className="flex flex-col container">
      <div className="wrapper">
        <Categories />
      </div>
      <div className="videos p-2">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            updatePlaylist={addToPlayList}
          />
        ))}
      </div>
      <Modal show={showModal}>
        <PlaylistModal setShowModal={setShowModal} videoId={videoId} />
      </Modal>
    </div>
  );
};

export default Home;
