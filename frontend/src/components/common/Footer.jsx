// src/components/common/Footer.jsx

import React from "react";

import { Link } from "react-router-dom";

import {
  FiGithub,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      {/* TOP AREA */}
      <div className="footer-container">
        {/* =========================================
            BRAND
        ========================================= */}

        <div className="footer-brand">
          <div className="footer-logo">
            <FiZap />
          </div>

          <h2>QuizVerse</h2>

          <p>
            Premium next-generation quiz platform with multiplayer battles,
            AI-powered challenges, achievements and leaderboard systems.
          </p>

          {/* SOCIALS */}
          <div className="footer-socials">
            <a href="#">
              <FiGithub />
            </a>

            <a href="#">
              <FiTwitter />
            </a>

            <a href="#">
              <FiInstagram />
            </a>

            <a href="#">
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* =========================================
            LINKS
        ========================================= */}

        <div className="footer-links">
          <h3>Platform</h3>

          <Link to="/">Home</Link>

          <Link to="/categories">Categories</Link>

          <Link to="/leaderboard">Leaderboard</Link>

          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* =========================================
            COMPANY
        ========================================= */}

        <div className="footer-links">
          <h3>Company</h3>

          <a href="#">About</a>

          <a href="#">Features</a>

          <a href="#">Careers</a>

          <a href="#">Contact</a>
        </div>

        {/* =========================================
            NEWSLETTER
        ========================================= */}

        <div className="footer-newsletter">
          <h3>Stay Updated</h3>

          <p>
            Get updates about new quiz categories, tournaments and premium
            rewards.
          </p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />

            <button>
              Join
              <FiArrowUpRight />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM
      ========================================= */}

      <div className="footer-bottom">
        <p>© 2026 QuizVerse Premium. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>

          <a href="#">Terms</a>

          <a href="#">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
