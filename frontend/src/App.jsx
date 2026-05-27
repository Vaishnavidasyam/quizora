// src/App.jsx

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";

/* PAGES */

import Landing from "./pages/Landing";

import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";

import Categories from "./pages/Categories";

import Quiz from "./pages/Quiz";

import Leaderboard from "./pages/Leaderboard";

import Profile from "./pages/Profile";

import Settings from "./pages/Settings";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Result from "./pages/Result";

import Achievements from "./pages/Achievements";

/* GLOBAL CSS */

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* NAVBAR */}

        <Navbar />

        {/* ROUTES */}

        <Routes>
          {/* LANDING */}

          <Route path="/" element={<Landing />} />

          {/* HOME */}

          <Route path="/home" element={<Home />} />

          {/* DASHBOARD */}

          <Route path="/dashboard" element={<Dashboard />} />

          {/* CATEGORIES */}

          <Route path="/categories" element={<Categories />} />

          {/* QUIZ */}

          <Route path="/quiz" element={<Quiz />} />

          {/* RESULT */}

          <Route path="/result" element={<Result />} />

          {/* LEADERBOARD */}

          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* PROFILE */}

          <Route path="/profile" element={<Profile />} />

          {/* SETTINGS */}

          <Route path="/settings" element={<Settings />} />

          {/* ACHIEVEMENTS */}

          <Route path="/achievements" element={<Achievements />} />

          {/* LOGIN */}

          <Route path="/login" element={<Login />} />

          {/* REGISTER */}

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
