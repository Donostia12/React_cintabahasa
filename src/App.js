import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          {/* Tambahkan rute lain di sini */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
