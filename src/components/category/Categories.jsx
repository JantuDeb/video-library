import React from "react";
import "./Category.css"
const Categories = () => {
  const categories = [
    "All",
    "JavaScript",
    "Computer Science",
    "Courses",
    "Java",
    "Algebra",
    "Editing",
    "Cricket",
  ];
  return (
    <div className="category-container">
      {categories.map((category) => (
        <li key={category} className="py-1 radius-full flex center">{category}</li>
      ))}
    </div>
  );
};

export default Categories;
