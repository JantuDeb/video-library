import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../../pages/Layout";

const PrivateRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem("user"))
  return user?<Layout>{children}</Layout>  : <Navigate to="/login" />
};

export default PrivateRoute;
