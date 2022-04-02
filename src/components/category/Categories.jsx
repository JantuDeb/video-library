import React from "react";
import { useVideos } from "../../context/videos/VideoContext";
import "./Category.css";
const Categories = () => {
  const { categories, setSelectedCategoryFilter, selectedCategory } =
    useVideos();

  const activeClassName = (id) =>
    `py-1 radius-full flex center pointer ${
      selectedCategory === id ? "active" : ""
    }`;

  return (
    <div className="category-container">
      <li
        className={activeClassName("")}
        onClick={() => setSelectedCategoryFilter("")}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          key={category._id}
          className={activeClassName(category._id)}
          onClick={() => setSelectedCategoryFilter(category._id)}
        >
          {category.name}
        </li>
      ))}
    </div>
  );
};

export default Categories;
