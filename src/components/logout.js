import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchorLock } from "@fortawesome/free-solid-svg-icons";

const LogoutLink = () => {
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Remove token from localStorage
      localStorage.removeItem("token");
      // Redirect to login page
      navigate("/");
    }
  };

  return (
    <li className="nav-item">
      <a
        href="/logout"
        className="nav-link text-white"
        onClick={handleLogoutClick}
      >
        <FontAwesomeIcon icon={faAnchorLock} className="me-2" />
        Logout
      </a>
    </li>
  );
};

export default LogoutLink;
