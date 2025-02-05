import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token di localStorage:", token);

      if (!token) {
        console.warn("Token tidak ditemukan, mengarahkan ke /");
        setIsTokenValid(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.cintabahasa.com/api/protected-endpoint",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          console.log("Token valid");
          setIsTokenValid(true);
        }
      } catch (error) {
        console.error("Token tidak valid atau terjadi kesalahan:", error);
        localStorage.removeItem("token"); // Remove the invalid token
        setIsTokenValid(false); // Set the state to false to trigger Navigate
      }
    };

    validateToken();
  }, []); // Empty dependency array ensures useEffect runs only once

  if (isTokenValid === false) {
    return <Navigate to="/" replace />;
  }

  if (isTokenValid === null) {
    // Tampilkan loading atau apapun selama pengecekan token
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
