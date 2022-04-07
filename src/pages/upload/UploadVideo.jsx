import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/loader/Button";
import Input from "../../components/shared/Input";
import { useVideos } from "../../context/videos/VideoContext";
import "./UploadVideo.css";
const UploadVideo = () => {
  const initialState = {
    title: "",
    description: "",
    channelTitle: "",
    duration: "",
    tags: [],
    categoryId: "",
    thumbnails: null,
    video: null,
  };
  const [video, setVideo] = useState(initialState);

  const [imgUrl, setImgUrl] = useState("");
  const [tag, setTag] = useState("");
  const { categories, uploadVideo, videoState } = useVideos();

  const {
    title,
    description,
    categoryId,
    tags,
    channelTitle,
    duration,
    thumbnails,
  } = video;

  const imageFileHandler = (e) => {
    setVideo({ ...video, thumbnails: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgUrl(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const videFileHandler = (e) => {
    setVideo({ ...video, video: e.target.files[0] });
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVideo({ ...video, [name]: value });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tag) {
      setVideo({ ...video, tags: [...video.tags, tag] });
      setTag("");
    }
  };

  const uploadVideoHandler = async (e) => {
    e.preventDefault();
    if (
      !categoryId ||
      !title ||
      !description ||
      !video ||
      !thumbnails ||
      !channelTitle ||
      !duration
    ) {
      return toast.dark("All the fields are required", { autoClose: 2000 });
    }

    await uploadVideo(video);
    setVideo(initialState);
    setImgUrl("");
  };

  return (
    <div className="container flex center">
      <form className="p-1">
        <Input
          placeholder="Title"
          name="title"
          value={title}
          inputChangeHandler={inputChangeHandler}
        />
        <div className="flex wrap gap-2">
          <Input
            placeholder="Thumbnail"
            name="thumbnail"
            type="file"
            inputChangeHandler={imageFileHandler}
          />
          <Input
            placeholder="Choose a video"
            name="video"
            type="file"
            inputChangeHandler={videFileHandler}
          />
        </div>

        <textarea
          className="w-full bg-secondary my-1 px-2 radius-md"
          rows={5}
          value={description}
          name="description"
          placeholder="Description"
          onChange={inputChangeHandler}
        />
        <div className="flex wrap gap-2">
          <Input
            placeholder="Channel Title"
            name="channelTitle"
            value={channelTitle}
            inputChangeHandler={inputChangeHandler}
          />
          <Input
            placeholder="Duration"
            name="duration"
            value={duration}
            inputChangeHandler={inputChangeHandler}
          />
          <div className="my-2">
            <div>Select Category</div>
            <select
              className=" my-2 border-0"
              onChange={(e) =>
                setVideo({ ...video, categoryId: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          Tags:
          {tags.map((tag, index) => (
            <span key={tag + index} className="px-2 py-1 bg-secondary m-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 items-end justify-between">
          <div className="flex items-end gap-2">
            <Input
              name="tag"
              value={tag}
              inputChangeHandler={(e) => setTag(e.target.value)}
              placeholder="Add Tag"
            />
            <button
              onClick={addTag}
              className="btn bg-secondary my-2 radius-sm"
            >
              Add
            </button>
          </div>
          <Button
            loading={videoState.loading}
            text="Upload video"
            btnStyle="btn-grad-red my-2 radius-sm"
            clickHandler={uploadVideoHandler}
          />
        </div>
        {imgUrl && (
          <div>
            <img src={imgUrl} alt="thumbnail" width="640px" />
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadVideo;
