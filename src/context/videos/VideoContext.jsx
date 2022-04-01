import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios-instance";

const VideoContext = createContext([]);
const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    (async () => {
      const [videoResponse, categoryResponse] = await Promise.all([
        axiosInstance.get("/videos"),
        axiosInstance.get("/categories"),
      ]);
      setVideos(videoResponse.data.videos);
      setCategories(categoryResponse.data.categories);
    })();
  }, []);

  const setSelectedCategoryFilter = (id) => setSelectedCategory(id);
  const fileterVideosByCategory = selectedCategory
    ? videos.filter((video) => video.categoryId === selectedCategory)
    : videos;

  return (
    <VideoContext.Provider
      value={{
        videos: fileterVideosByCategory,
        categories,
        setSelectedCategoryFilter,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideos = () => useContext(VideoContext);
export { VideoProvider, useVideos };
