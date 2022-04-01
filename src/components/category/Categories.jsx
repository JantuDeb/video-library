import React from "react";
import { useVideos } from "../../context/videos/VideoContext";
import "./Category.css";
const Categories = () => {
  const { categories, setSelectedCategoryFilter } = useVideos();
  return (
    <div className="category-container">
      <li
        className="py-1 radius-full flex center pointer"
        onClick={() => setSelectedCategoryFilter("")}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          key={category._id}
          className="py-1 radius-full flex center pointer"
          onClick={() => setSelectedCategoryFilter(category._id)}
        >
          {category.name}
        </li>
      ))}
    </div>
  );
};

export default Categories;
