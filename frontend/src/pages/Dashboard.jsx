// src/pages/Dashboard.jsx

import React from "react";

import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiAward,
  FiZap,
  FiTarget,
  FiStar,
  FiClock,
  FiArrowRight,
  FiPlay,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import Footer from "../components/common/Footer";

import "./Dashboard.css";

const Dashboard = () => {
  // =========================================
  // USER
  // =========================================

  const user = {
    username: "Vaishnavi",
  };

  // =========================================
  // AUTO GENDER AVATAR
  // =========================================

  const femaleNames = [
    "vaishnavi",
    "sneha",
    "priya",
    "sravya",
    "kavya",
    "divya",
    "harika",
    "ananya",
    "siri",
    "deepika",
  ];

  const isFemale = femaleNames.includes(user.username.toLowerCase());

  const avatarUrl = isFemale
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`
    : `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

  // =========================================
  // STATS
  // =========================================

  const stats = [
    {
      title: "Total XP",

      value: "9,850",

      icon: <FiZap />,

      color: "cyan",
    },

    {
      title: "Achievements",

      value: "28",

      icon: <FiAward />,

      color: "blue",
    },

    {
      title: "Accuracy",

      value: "96%",

      icon: <FiTarget />,

      color: "green",
    },

    {
      title: "Win Streak",

      value: "12",

      icon: <FiTrendingUp />,

      color: "orange",
    },
  ];

  // =========================================
  // CATEGORIES
  // =========================================

  const categories = [
    {
      title: "Movies",

      icon: "🎬",

      quizzes: "120+ Quizzes",
    },

    {
      title: "Gaming",

      icon: "🎮",

      quizzes: "95+ Quizzes",
    },

    {
      title: "AI & ML",

      icon: "🤖",

      quizzes: "60+ Quizzes",
    },

    {
      title: "Science",

      icon: "🧪",

      quizzes: "80+ Quizzes",
    },
  ];

  // =========================================
  // ACTIVITIES
  // =========================================

  const activities = [
    "Won AI Battle Arena",

    "Unlocked Platinum Badge",

    "Completed Science Quiz",

    "Reached 12 Quiz Streak",
  ];

  return (
    <div className="dashboard-page">
      {/* =====================================
          GLOWS
      ===================================== */}

      <div className="dashboard-glow glow-left" />

      <div className="dashboard-glow glow-right" />

      {/* =====================================
          HERO
      ===================================== */}

      <section className="dashboard-hero">
        <div className="container-premium">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="dashboard-top"
          >
            {/* =====================================
                LEFT
            ===================================== */}

            <div>
              <div className="dashboard-badge">ELITE PLAYER DASHBOARD</div>

              <h1 className="dashboard-title">
                Welcome Back,
                <span className="gradient-text"> {user.username}</span>
              </h1>

              <p className="dashboard-description">
                Continue your premium quiz journey, unlock achievements,
                challenge players globally and dominate the leaderboard.
              </p>

              <div className="dashboard-buttons">
                <Link to="/categories" className="dashboard-btn-primary">
                  <FiPlay />
                  Start Quiz
                </Link>
              </div>
            </div>

            {/* =====================================
                PROFILE CARD
            ===================================== */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              className="dashboard-profile glass-card"
            >
              {/* AVATAR */}

              <img
                src={avatarUrl}
                alt={user.username}
                className="dashboard-avatar"
              />

              <h3>{user.username}</h3>

              <p>Elite Quiz Master</p>

              <div className="dashboard-rank">Platinum Rank</div>

              <div className="dashboard-profile-stats">
                <div>
                  <strong>48</strong>

                  <span>Level</span>
                </div>

                <div>
                  <strong>96%</strong>

                  <span>Accuracy</span>
                </div>

                <div>
                  <strong>12</strong>

                  <span>Streak</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================
              STATS
          ===================================== */}

          <div className="dashboard-stats">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="dashboard-stat-card glass-card"
              >
                <div className={`dashboard-stat-icon ${item.color}`}>
                  {item.icon}
                </div>

                <div>
                  <h2>{item.value}</h2>

                  <p>{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN
      ===================================== */}

      <section className="dashboard-main">
        <div className="container-premium dashboard-grid">
          {/* =====================================
              LEFT
          ===================================== */}

          <div>
            {/* FEATURED */}

            <div className="dashboard-featured glass-card">
              <div>
                <span>🔥 DAILY CHALLENGE</span>

                <h2>AI Mega Battle Arena</h2>

                <p>
                  Complete today’s premium challenge and earn double XP rewards.
                </p>

                <Link to="/categories" className="dashboard-btn-primary">
                  Play Challenge
                </Link>
              </div>

              <div className="featured-emoji">⚔️</div>
            </div>

            {/* CATEGORIES */}

            <div className="dashboard-section">
              <div className="dashboard-section-top">
                <h2>Popular Categories</h2>

                <Link to="/categories">View All</Link>
              </div>

              <div className="dashboard-categories">
                {categories.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -6,
                    }}
                    className="dashboard-category-card glass-card"
                  >
                    <div className="dashboard-category-icon">{item.icon}</div>

                    <h3>{item.title}</h3>

                    <p>{item.quizzes}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT
          ===================================== */}

          <div className="dashboard-right">
            {/* PROGRESS */}

            <div className="dashboard-progress glass-card">
              <div className="dashboard-section-top">
                <h2>Level Progress</h2>

                <FiStar />
              </div>

              <div className="progress-circle">
                <div className="progress-inner">82%</div>
              </div>

              <p>1,240 XP remaining to reach Level 49</p>
            </div>

            {/* ACTIVITY */}

            <div className="dashboard-activity glass-card">
              <div className="dashboard-section-top">
                <h2>Recent Activity</h2>

                <FiClock />
              </div>

              <div className="dashboard-activity-list">
                {activities.map((item, index) => (
                  <div key={index} className="dashboard-activity-item">
                    <div className="dashboard-dot" />

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LEADERBOARD */}

            <div className="dashboard-leaderboard glass-card">
              <div className="dashboard-section-top">
                <h2>Leaderboard</h2>
                🏆
              </div>

              <div className="leaderboard-user">
                <span>#1</span>

                <p>CyberKnight</p>

                <strong>12,890 XP</strong>
              </div>

              <div className="leaderboard-user">
                <span>#2</span>

                <p>{user.username}</p>

                <strong>9,850 XP</strong>
              </div>

              <div className="leaderboard-user">
                <span>#3</span>

                <p>NovaX</p>

                <strong>8,210 XP</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
