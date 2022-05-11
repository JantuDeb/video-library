import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div class="fof container">
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="text-blue">Go To Home</Link>
    </div>
  );
};

export default PageNotFound;
