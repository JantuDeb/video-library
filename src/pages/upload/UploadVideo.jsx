import React, { useState } from "react";
import Input from "../../components/shared/Input";
import "./UploadVideo.css";
const UploadVideo = () => {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    channelTitle: "",
    duration: "",
    tags: [],
    categoryId: "",
    thumbnails: null,
    video: null,
  });

  const [imgUrl, setImgUrl] = useState("");
  const { title, description, categoryId, tags, channelTitle, duration } =
    video;

  const imageFileHandler = (e) => {
    setVideo({ ...video, thumbnails: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgUrl(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container flex center">
      <form>
        <Input placeholder="Title" name="title" value={title} />
        <div className="flex wrap gap-2">
          <Input
            placeholder="Channel Title"
            name="channelTitle"
            value={channelTitle}
          />
          <Input placeholder="Duration" name="duration" value={duration} />
        </div>
        <textarea
          className="w-full bg-secondary my-1 px-2 radius-md"
          rows={5}
          value={description}
          placeholder="Description"
        />
        <div className="flex wrap gap-2">
          <div>
            <div>Select Category</div>
            <select className="my-1 border-0">
              <option value="az">A-Z</option>
              <option value="newest">Dated New</option>
              <option value="old">Dated Old</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
