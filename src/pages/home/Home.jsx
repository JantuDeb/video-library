import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Categories from "../../components/category/Categories";
import Modal from "../../components/shared/modal/Modal";
import VideoCard from "../../components/shared/VideoCard";
import { useVideos } from "../../context/videos/VideoContext";
import "./Home.css";
const Home = () => {
  const { videos } = useVideos();
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const addToPlayList = (id) => {
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
            key={video.id}
            video={video}
            addToPlayList={addToPlayList}
          />
        ))}
      </div>
      <Modal show={showModal}>
        <div className="flex-col add-play-card p-2">
          <div className="flex justify-between">
            <span className="font-medium">Save to...</span>
            <MdClose onClick={() => setShowModal((v) => !v)} />
          </div>
          <div className="flex-col">
            {[...Array(10)].map((_, i) => (
              <div className="flex items-center gap-1">
                <input type="checkbox" id="playlist"  />
                <label htmlFor="playlist"> Playlist {i}</label>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Create new playlist"
                className="input-playlist grow bg-primary"
                autoFocus={true}
              />
              <span className="bg-primary p-1 flex center">
                <BiPlus
                  size="20px"
                  className="pointer"
                  onClick={() => console.log("add")}
                />
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
