// src/pages/Profile.jsx

import React from "react";

import { motion } from "framer-motion";

import {
  FiEdit,
  FiAward,
  FiStar,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiClock,
} from "react-icons/fi";

import "./Profile.css";

const Profile = () => {
  // =========================================
  // USER DATA
  // =========================================

  const user = {
    username: "Vaishnavi",

    bio: "Elite Quiz Player • AI Enthusiast • Competitive Gamer",

    xp: "9,850",

    level: 48,

    rank: "Platinum",

    quizzes: 248,

    accuracy: "96%",

    streak: 12,
  };

  // =========================================
  // FEMALE / MALE AVATAR
  // =========================================

  const femaleNames = [
    "vaishnavi",
    "sneha",
    "priya",
    "kavya",
    "divya",
    "ananya",
  ];

  const isFemale = femaleNames.includes(user.username.toLowerCase());

  const avatarUrl = isFemale
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`
    : `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

  // =========================================
  // ACHIEVEMENTS
  // =========================================

  const achievements = [
    {
      title: "Quiz Master",
      icon: "🏆",
    },

    {
      title: "AI Champion",
      icon: "🤖",
    },

    {
      title: "Top Scorer",
      icon: "🔥",
    },

    {
      title: "Speed Genius",
      icon: "⚡",
    },
  ];

  // =========================================
  // RECENT ACTIVITY
  // =========================================

  const activities = [
    "Won AI Battle Arena",

    "Completed Science Quiz",

    "Reached 12 Win Streak",

    "Unlocked Platinum Rank",
  ];

  return (
    <div className="profile-page">
      {/* =====================================
          GLOWS
      ===================================== */}

      <div className="profile-glow glow-left" />

      <div className="profile-glow glow-right" />

      {/* =====================================
          HERO
      ===================================== */}

      <section className="profile-hero">
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
            className="profile-card glass-card"
          >
            {/* AVATAR */}

            <div className="profile-avatar-wrapper">
              <img
                src={avatarUrl}
                alt={user.username}
                className="profile-avatar"
              />

              <button className="profile-edit-btn">
                <FiEdit />
              </button>
            </div>

            {/* USER INFO */}

            <div className="profile-info">
              <span className="profile-rank">{user.rank} Rank</span>

              <h1>{user.username}</h1>

              <p>{user.bio}</p>

              <div className="profile-buttons">
                <button className="profile-btn-primary">Edit Profile</button>

                <button className="profile-btn-secondary">Share Profile</button>
              </div>
            </div>
          </motion.div>

          {/* =====================================
              STATS
          ===================================== */}

          <div className="profile-stats">
            <div className="profile-stat glass-card">
              <div className="stat-icon cyan">
                <FiZap />
              </div>

              <div>
                <h2>{user.xp}</h2>

                <p>Total XP</p>
              </div>
            </div>

            <div className="profile-stat glass-card">
              <div className="stat-icon blue">
                <FiAward />
              </div>

              <div>
                <h2>{user.level}</h2>

                <p>Level</p>
              </div>
            </div>

            <div className="profile-stat glass-card">
              <div className="stat-icon green">
                <FiTarget />
              </div>

              <div>
                <h2>{user.accuracy}</h2>

                <p>Accuracy</p>
              </div>
            </div>

            <div className="profile-stat glass-card">
              <div className="stat-icon orange">
                <FiTrendingUp />
              </div>

              <div>
                <h2>{user.streak}</h2>

                <p>Win Streak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN GRID
      ===================================== */}

      <section className="profile-main">
        <div className="container-premium profile-grid">
          {/* ACHIEVEMENTS */}

          <div className="profile-achievements glass-card">
            <div className="section-top">
              <h2>
                <FiStar />
                Achievements
              </h2>
            </div>

            <div className="achievement-list">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                  }}
                  className="achievement-card"
                >
                  <div className="achievement-icon">{item.icon}</div>

                  <h3>{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}

          <div className="profile-activity glass-card">
            <div className="section-top">
              <h2>
                <FiClock />
                Recent Activity
              </h2>
            </div>

            <div className="activity-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot" />

                  <p>{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
