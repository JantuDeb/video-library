import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Categories from "../../components/category/Categories";
import Loader from "../../components/loader/Loader";

import VideoCard from "../../components/shared/video-card/VideoCard";
import { SET_SEARCH_QUERY } from "../../context/videos/video-reducer";
import { useVideos } from "../../context/videos/VideoContext";
import "./Home.css";
const Home = () => {
  const {
    videos,
    videoState: { loading },
    videoDispatch,
  } = useVideos();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  
  useEffect(() => {
    videoDispatch({ type: SET_SEARCH_QUERY, payload: { query } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);


  return (
    <div className="flex flex-col container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="wrapper">
            <Categories />
          </div>
          <div className="videos p-2">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
