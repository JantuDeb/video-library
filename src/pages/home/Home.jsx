import React from "react";
import Categories from "../../components/category/Categories";
import VideoCard from "../../components/shared/VideoCard";
import "./Home.css";
const Home = () => {
  return (
    <div className="flex flex-col container">
      <div className="wrapper">
        <Categories />
      </div>
      <div className="videos p-2">
       {[...Array(20)].map(item=><VideoCard key={item}  /** TODO: pass video object prop */ />)}
      </div>
    </div>
  );
};

export default Home;
