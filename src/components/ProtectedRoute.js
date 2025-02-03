import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token di localStorage:", token);

  if (!token) {
    console.warn("Token tidak ditemukan, mengarahkan ke /login");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
