import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/login";
import Student from "./components/student";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/sidebar";
import EditStudent from "./components/EditStudent"; // Import EditStudent component
import IsLogin from "./components/Islogin"; // Import the IsLogin component

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="d-flex vh-100">
      {!isLoginPage && <Sidebar className="sidebar bg-dark text-white" />}
      <div className="main-content flex-grow-1 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <IsLogin>
                <Login />
              </IsLogin>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <Student />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/edit/:id"
            element={
              <ProtectedRoute>
                <EditStudent />
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
          {/* Default route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
