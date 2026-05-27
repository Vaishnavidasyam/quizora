import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  FiHome,
  FiGrid,
  FiAward,
  FiUser,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { motion } from "framer-motion";

import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  /* =========================================
     THEME
  ========================================= */

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  /* =========================================
     NAV LINKS
  ========================================= */

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
    },

    {
      name: "Categories",
      path: "/categories",
      icon: <FiGrid />,
    },

    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <FiAward />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FiUser />,
    },
  ];

  return (
    <header className="navbar">
      {/* BACKGROUND */}

      <div className="navbar-blur"></div>

      <div className="navbar-container">
        {/* =====================================
            LOGO
        ===================================== */}

        <Link to="/" className="navbar-logo">
          <motion.div
            whileHover={{
              rotate: 6,
              scale: 1.04,
            }}
            className="logo-image-wrapper"
          >
            <img
              src="/artificial-intelligence.png"
              alt="Quizora"
              className="logo-image"
            />
          </motion.div>

          <div className="logo-text">
            <h1>Quizora</h1>

            <p>AI POWERED QUIZ PLATFORM</p>
          </div>
        </Link>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <nav className="navbar-links">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active-link" : ""
              }`}
            >
              <span className="nav-icon">{item.icon}</span>

              {item.name}
            </Link>
          ))}
        </nav>

        {/* =====================================
            ACTIONS
        ===================================== */}

        <div className="navbar-actions">
          {/* THEME */}

          {/* LOGIN */}

          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>

        {/* =====================================
            MOBILE TOGGLE
        ===================================== */}

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`mobile-link ${
                location.pathname === item.path ? "active-mobile" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.icon}

              {item.name}
            </Link>
          ))}

          {/* MOBILE LOGIN */}

          <Link to="/login" className="mobile-login">
            Login
          </Link>

          {/* MOBILE THEME */}

          <button className="mobile-theme" onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
