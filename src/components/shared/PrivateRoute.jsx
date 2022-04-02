import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import Layout from "../../pages/Layout";

const PrivateRoute = ({children}) => {
  const { authState } = useAuth();
  return authState.isLogedIn?<Layout>{children}</Layout>  : <Navigate to="/login" replace/>
};

export default PrivateRoute;
