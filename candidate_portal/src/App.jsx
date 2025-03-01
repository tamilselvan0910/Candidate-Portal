import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Candidate from "./Candidate";
import Hr from "./Hr";
import Recruiter from "./Recruiter";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/candidate" className="nav-link">
          Candidate Upload
        </Link>
        <Link to="/hr" className="nav-link">
          HR Panel
        </Link>
        <Link to="/recruiter" className="nav-link">
          Recruiter Panel
        </Link>
      </div>

      <div className="content">
        <Routes>
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/hr" element={<Hr />} />
          <Route path="/recruiter" element={<Recruiter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;