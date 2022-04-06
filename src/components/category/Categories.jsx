import React from "react";
import { SET_CURRENT_CATEGORY } from "../../context/videos/video-reducer";
import { useVideos } from "../../context/videos/VideoContext";
import "./Category.css";
const Categories = () => {
  const { categories, videoState, videoDispatch } =
    useVideos();

  const activeClassName = (id) =>
    `py-1 radius-full flex center pointer ${
      videoState.currentCategory === id ? "active" : ""
    }`;

  return (
    <div className="category-container">
      <li
        className={activeClassName("")}
        onClick={() => videoDispatch({type:SET_CURRENT_CATEGORY, payload:{category:""}})}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          key={category._id}
          className={activeClassName(category._id)}
          onClick={() => videoDispatch({type:SET_CURRENT_CATEGORY, payload:{category:category._id}})}
        >
          {category.name}
        </li>
      ))}
    </div>
  );
};

export default Categories;
