import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faCog,
  faAnchorLock,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import LogoutLink from "./logout";
function Sidebar() {
  return (
    <div
      className="sidebar bg-dark text-white d-flex flex-column"
      style={{ height: "100vh", width: "250px" }}
    >
      <h3 className="text-center py-3">Menu</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/student" className="nav-link text-white">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link text-white">
            <FontAwesomeIcon icon={faCog} className="me-2" />
            Settings
          </Link>
        </li>
        <LogoutLink />
      </ul>
    </div>
  );
}

export default Sidebar;
