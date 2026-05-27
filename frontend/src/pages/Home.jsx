// src/pages/Home.jsx

import React from "react";

import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiPlay,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../components/common/Footer";

const Home = () => {
  const trendingQuizzes = [
    {
      title: "AI Ultimate Challenge",
      category: "AI & ML",
      players: "12K+",
      icon: "🤖",
    },

    {
      title: "Marvel Universe Quiz",
      category: "Movies",
      players: "8K+",
      icon: "🎬",
    },

    {
      title: "Esports Battle Arena",
      category: "Gaming",
      players: "15K+",
      icon: "🎮",
    },
  ];

  const recentActivities = [
    {
      title: "Completed AI Battle Arena",
      time: "2 mins ago",
    },

    {
      title: "Unlocked Platinum Badge",
      time: "10 mins ago",
    },

    {
      title: "Won 5 Quiz Streak",
      time: "25 mins ago",
    },
  ];

  const achievements = [
    {
      title: "Quiz Champion",
      xp: "+1200 XP",
      icon: "🏆",
    },

    {
      title: "Speed Master",
      xp: "+850 XP",
      icon: "⚡",
    },

    {
      title: "Brainiac",
      xp: "+950 XP",
      icon: "🧠",
    },
  ];

  return (
    <div className="home-page">
      {/* ====================================
          HERO
      ==================================== */}

      <section className="home-hero">
        <div className="home-glow glow-1" />

        <div className="home-glow glow-2" />

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
            className="home-hero-content"
          >
            <div>
              <div className="home-badge">
                <FiZap />
                Premium Quiz Experience
              </div>

              <h1 className="home-title">
                Learn.
                <br />
                Play.
                <br />
                <span className="gradient-text">Dominate.</span>
              </h1>

              <p className="home-description">
                Experience immersive quizzes with AI-powered gameplay,
                multiplayer battles, achievements and real-time leaderboards.
              </p>

              <div className="home-buttons">
                <Link to="/quiz" className="btn-primary">
                  <FiPlay />
                  Start Quiz
                </Link>

                <Link to="/categories" className="btn-secondary">
                  Explore Categories
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            {/* HERO CARD */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className="home-hero-card glass-card"
            >
              <div className="hero-card-top">
                <div>
                  <p>LIVE MATCH</p>

                  <h3>Science Arena</h3>
                </div>

                <span>LIVE</span>
              </div>

              <div className="hero-score">
                <h2>9,850 XP</h2>

                <div className="hero-rank">#12 Global</div>
              </div>

              <div className="hero-progress">
                <div className="hero-progress-top">
                  <p>Level Progress</p>

                  <span>82%</span>
                </div>

                <div className="hero-progress-bar">
                  <div className="hero-progress-fill" />
                </div>
              </div>

              <div className="hero-achievements">
                <div>🏆 Elite Player</div>

                <div>⚡ 12 Streak</div>

                <div>🎯 96% Accuracy</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====================================
          MAIN GRID
      ==================================== */}

      <section className="home-main">
        <div className="container-premium home-grid">
          {/* LEFT */}
          <div className="home-left">
            {/* TRENDING */}
            <div className="home-section">
              <div className="section-heading">
                <h2>Trending Quizzes</h2>

                <Link to="/categories">View All</Link>
              </div>

              <div className="trending-grid">
                {trendingQuizzes.map((quiz, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -6,
                    }}
                    className="trending-card glass-card"
                  >
                    <div className="trending-icon">{quiz.icon}</div>

                    <h3>{quiz.title}</h3>

                    <p>{quiz.category}</p>

                    <span>
                      <FiTrendingUp />
                      {quiz.players} playing
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="home-section">
              <div className="section-heading">
                <h2>Achievements</h2>

                <Link to="/achievements">View All</Link>
              </div>

              <div className="achievement-list">
                {achievements.map((item, index) => (
                  <div key={index} className="achievement-card glass-card">
                    <div className="achievement-left">
                      <div className="achievement-icon">{item.icon}</div>

                      <div>
                        <h3>{item.title}</h3>

                        <p>{item.xp}</p>
                      </div>
                    </div>

                    <FiAward />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="home-right">
            {/* PROFILE */}
            <div className="profile-widget glass-card">
              <img src="https://i.pravatar.cc/300?img=12" alt="" />

              <h3>Vaishnavi</h3>

              <p>Elite Quiz Master</p>

              <div className="profile-stats">
                <div>
                  <strong>9.8K</strong>

                  <span>XP</span>
                </div>

                <div>
                  <strong>48</strong>

                  <span>Level</span>
                </div>

                <div>
                  <strong>96%</strong>

                  <span>Accuracy</span>
                </div>
              </div>
            </div>

            {/* ACTIVITY */}
            <div className="activity-widget glass-card">
              <div className="section-heading">
                <h2>Recent Activity</h2>

                <FiClock />
              </div>

              <div className="activity-list">
                {recentActivities.map((item, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-dot" />

                    <div>
                      <h4>{item.title}</h4>

                      <p>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DAILY CHALLENGE */}
            <div className="challenge-widget glass-card">
              <span>🔥 DAILY CHALLENGE</span>

              <h2>Ultimate AI Quiz</h2>

              <p>Complete today’s challenge and earn double rewards.</p>

              <Link to="/quiz" className="btn-primary">
                Play Challenge
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
