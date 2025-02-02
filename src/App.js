import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/sidebar";
import Student from "./components/student";

function App() {
  return (
    <Router>
      {/* Gunakan vh-100 agar tinggi penuh */}
      <div className="d-flex vh-100">
        {/* Sidebar hanya selebar 250px */}
        <Sidebar className="sidebar bg-dark text-white" />

        {/* Main content flex agar menyesuaikan */}
        <div className="main-content flex-grow-1 p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/student"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
