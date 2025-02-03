import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsLogin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default IsLogin;
