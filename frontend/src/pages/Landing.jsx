// src/pages/Landing.jsx

import React from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiPlay,
  FiStar,
  FiUsers,
  FiZap,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import "./Landing.css";
import Footer from "../components/common/Footer";

const Landing = () => {
  const stats = [
    {
      number: "50K+",
      label: "Active Players",
      icon: <FiUsers />,
    },

    {
      number: "1M+",
      label: "Questions Played",
      icon: <FiZap />,
    },

    {
      number: "120+",
      label: "Premium Quizzes",
      icon: <FiStar />,
    },

    {
      number: "99%",
      label: "Player Satisfaction",
      icon: <FiTrendingUp />,
    },
  ];

  const features = [
    {
      title: "AI Powered Quizzes",

      description: "Experience adaptive questions powered by smart AI systems.",

      icon: "🤖",
    },

    {
      title: "Live Multiplayer",

      description: "Challenge your friends and battle players worldwide.",

      icon: "⚔️",
    },

    {
      title: "Achievements & Rewards",

      description: "Unlock premium badges, XP rewards and daily bonuses.",

      icon: "🏆",
    },
  ];

  return (
    <div className="landing-page">
      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero-section">
        {/* BACKGROUND GLOW */}
        <div className="hero-glow hero-glow-1" />

        <div className="hero-glow hero-glow-2" />

        <div className="container-premium hero-grid">
          {/* =====================================
              LEFT CONTENT
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="hero-badge">
              <FiAward />
              #1 Premium Quiz Platform
            </div>

            <h1 className="hero-title">
              Play Smart.
              <br />
              <span className="gradient-text">Compete Better.</span>
            </h1>

            <p className="hero-description">
              Experience next-generation quiz gaming with AI-powered challenges,
              live multiplayer battles, premium rewards and competitive
              leaderboards.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                <FiPlay />
                Get Started
              </Link>
            </div>

            {/* MINI USERS */}
            <div className="hero-users">
              <div className="user-stack">
                <img src="https://i.pravatar.cc/100?img=11" alt="" />

                <img src="https://i.pravatar.cc/100?img=12" alt="" />

                <img src="https://i.pravatar.cc/100?img=13" alt="" />

                <img src="https://i.pravatar.cc/100?img=14" alt="" />
              </div>

              <p>
                Trusted by <span>50,000+</span> players worldwide
              </p>
            </div>
          </motion.div>

          {/* =====================================
              RIGHT HERO CARD
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="hero-card glass-card"
          >
            {/* TOP */}
            <div className="hero-card-top">
              <div>
                <p>LIVE QUIZ MATCH</p>

                <h3>Science Challenge</h3>
              </div>

              <div className="live-badge">LIVE</div>
            </div>

            {/* SCORE */}
            <div className="quiz-score">
              <div>
                <span>Player Score</span>

                <h2>9,850 XP</h2>
              </div>

              <div className="score-circle">🔥</div>
            </div>

            {/* PROGRESS */}
            <div className="quiz-progress">
              <div className="progress-top">
                <span>Level Progress</span>

                <span>82%</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="achievement-box">
              <div className="achievement-item">🏆 1st Place</div>

              <div className="achievement-item">⚡ 12 Win Streak</div>

              <div className="achievement-item">🎯 Accuracy 96%</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          STATS
      ===================================== */}

      <section className="stats-section">
        <div className="container-premium stats-grid">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="stats-card"
            >
              <div className="stats-icon">{item.icon}</div>

              <h2>{item.number}</h2>

              <p>{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================
          FEATURES
      ===================================== */}

      <section className="features-section">
        <div className="container-premium">
          <div className="section-heading">
            <span>PREMIUM FEATURES</span>

            <h2>
              Why Players Love
              <br />
              <span className="gradient-text">QuizVerse</span>
            </h2>
          </div>

          <div className="features-grid">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="feature-card glass-card"
              >
                <div className="feature-icon">{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          CTA
      ===================================== */}

      <section className="cta-section">
        <div className="container-premium">
          <div className="cta-box glass-card">
            <h2>
              Ready To Become
              <br />
              <span className="gradient-text">A Quiz Champion?</span>
            </h2>

            <p>
              Join thousands of competitive players and experience the future of
              online quiz gaming.
            </p>

            <Link to="/register" className="btn-primary">
              Start Playing Now
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
