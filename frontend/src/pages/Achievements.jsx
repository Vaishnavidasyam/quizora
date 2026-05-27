// src/pages/Achievements.jsx

import React from "react";

import { motion } from "framer-motion";

import {
  FiAward,
  FiLock,
  FiStar,
  FiTrendingUp,
  FiTarget,
} from "react-icons/fi";

import Footer from "../components/common/Footer";

import "./Achievements.css";

const Achievements = () => {
  const achievements = [
    {
      title: "Quiz Champion",

      description: "Win 50 quizzes with 90%+ accuracy.",

      icon: "🏆",

      progress: 92,

      xp: "1200 XP",

      unlocked: true,

      rarity: "Legendary",
    },

    {
      title: "Speed Master",

      description: "Answer 100 questions under 5 seconds.",

      icon: "⚡",

      progress: 75,

      xp: "850 XP",

      unlocked: true,

      rarity: "Epic",
    },

    {
      title: "AI Dominator",

      description: "Complete all AI & ML quizzes.",

      icon: "🤖",

      progress: 48,

      xp: "1500 XP",

      unlocked: false,

      rarity: "Legendary",
    },

    {
      title: "Movie Expert",

      description: "Score 100% in Movies category.",

      icon: "🎬",

      progress: 100,

      xp: "600 XP",

      unlocked: true,

      rarity: "Rare",
    },

    {
      title: "Quiz Streak",

      description: "Maintain a 15 quiz winning streak.",

      icon: "🔥",

      progress: 63,

      xp: "950 XP",

      unlocked: false,

      rarity: "Epic",
    },

    {
      title: "Knowledge Titan",

      description: "Reach Level 50 in QuizVerse.",

      icon: "🧠",

      progress: 84,

      xp: "2000 XP",

      unlocked: false,

      rarity: "Mythic",
    },
  ];

  const stats = [
    {
      label: "Unlocked",

      value: "28",

      icon: <FiAward />,
    },

    {
      label: "Total XP",

      value: "9.8K",

      icon: <FiTrendingUp />,
    },

    {
      label: "Completion",

      value: "74%",

      icon: <FiTarget />,
    },
  ];

  return (
    <div className="achievements-page">
      {/* ====================================
          HERO
      ==================================== */}

      <section className="achievements-hero">
        <div className="achievement-glow glow-left" />

        <div className="achievement-glow glow-right" />

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
            className="achievements-header"
          >
            <div>
              <div className="achievement-badge">
                <FiStar />
                ELITE COLLECTION
              </div>

              <h1 className="achievements-title">
                Achievements &<span className="gradient-text"> Rewards</span>
              </h1>

              <p className="achievements-description">
                Unlock exclusive achievements, earn XP rewards and prove your
                dominance across QuizVerse.
              </p>
            </div>

            {/* PROFILE */}
            <div className="achievement-profile glass-card">
              <img src="https://i.pravatar.cc/300?img=12" alt="" />

              <h3>Vaishnavi</h3>

              <p>Elite Quiz Master</p>

              <div className="achievement-level">Level 48</div>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="achievement-stats">
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
                className="achievement-stat-card glass-card"
              >
                <div className="achievement-stat-icon">{item.icon}</div>

                <div>
                  <h2>{item.value}</h2>

                  <p>{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          ACHIEVEMENTS GRID
      ==================================== */}

      <section className="achievement-grid-section">
        <div className="container-premium">
          <div className="achievement-grid">
            {achievements.map((item, index) => (
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
                whileHover={{
                  y: -8,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className={`achievement-card glass-card ${
                  item.unlocked ? "unlocked" : "locked"
                }`}
              >
                {/* RARITY */}
                <div className="achievement-rarity">{item.rarity}</div>

                {/* ICON */}
                <div className="achievement-icon">
                  {item.unlocked ? item.icon : <FiLock />}
                </div>

                {/* CONTENT */}
                <h3>{item.title}</h3>

                <p>{item.description}</p>

                {/* PROGRESS */}
                <div className="achievement-progress">
                  <div className="achievement-progress-top">
                    <span>Progress</span>

                    <span>{item.progress}%</span>
                  </div>

                  <div className="achievement-progress-bar">
                    <div
                      className="achievement-progress-fill"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div className="achievement-footer">
                  <span>{item.xp}</span>

                  {item.unlocked ? (
                    <div className="achievement-unlocked">UNLOCKED</div>
                  ) : (
                    <div className="achievement-locked">LOCKED</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Achievements;
