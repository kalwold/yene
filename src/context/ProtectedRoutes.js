import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import Loading from "../components/Loading";

const ProtectedRoutes = ({ children }) => {
  const { authToken, loading } = useContext(AuthContext);

  if (loading) {
    return <div><Loading /></div>; }

  return authToken ? children : <Navigate to="/login" replace/>;
};

export default ProtectedRoutes;
