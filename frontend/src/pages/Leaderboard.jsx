// src/pages/Leaderboard.jsx

import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiAward, FiStar, FiTarget } from "react-icons/fi";

import "./Leaderboard.css";

const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,

      username: "CyberKnight",

      xp: "12,890",

      accuracy: "99%",

      streak: 24,

      badge: "🏆",
    },

    {
      rank: 2,

      username: "Vaishnavi",

      xp: "9,850",

      accuracy: "96%",

      streak: 12,

      badge: "🥈",
    },

    {
      rank: 3,

      username: "NovaX",

      xp: "8,210",

      accuracy: "94%",

      streak: 9,

      badge: "🥉",
    },

    {
      rank: 4,

      username: "PixelStorm",

      xp: "7,940",

      accuracy: "91%",

      streak: 7,

      badge: "🔥",
    },

    {
      rank: 5,

      username: "DarkWolf",

      xp: "7,110",

      accuracy: "89%",

      streak: 5,

      badge: "⚡",
    },
  ];

  return (
    <div className="leaderboard-page">
      {/* ====================================
          GLOWS
      ==================================== */}

      <div className="leaderboard-glow glow-left" />

      <div className="leaderboard-glow glow-right" />

      {/* ====================================
          HERO
      ==================================== */}

      <section className="leaderboard-hero">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="leaderboard-header"
        >
          <div className="leaderboard-badge">
            <FiTrendingUp />
            GLOBAL RANKINGS
          </div>

          <h1>
            Elite
            <span className="gradient-text"> Leaderboard</span>
          </h1>

          <p>
            Compete with top quiz players worldwide and climb to the top of the
            premium leaderboard arena.
          </p>
        </motion.div>
      </section>

      {/* ====================================
          TOP STATS
      ==================================== */}

      <section className="leaderboard-stats-section">
        <div className="container-premium leaderboard-stats">
          <div className="leaderboard-stat-card glass-card">
            <div className="leaderboard-stat-icon cyan">
              <FiAward />
            </div>

            <div>
              <h2>50K+</h2>

              <p>Active Players</p>
            </div>
          </div>

          <div className="leaderboard-stat-card glass-card">
            <div className="leaderboard-stat-icon blue">
              <FiStar />
            </div>

            <div>
              <h2>2M+</h2>

              <p>Total XP Earned</p>
            </div>
          </div>

          <div className="leaderboard-stat-card glass-card">
            <div className="leaderboard-stat-icon green">
              <FiTarget />
            </div>

            <div>
              <h2>12K+</h2>

              <p>Daily Battles</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          LEADERBOARD TABLE
      ==================================== */}

      <section className="leaderboard-table-section">
        <div className="container-premium">
          <div className="leaderboard-table glass-card">
            {/* HEADER */}

            <div className="leaderboard-table-header">
              <span>Rank</span>

              <span>Player</span>

              <span>XP</span>

              <span>Accuracy</span>

              <span>Streak</span>
            </div>

            {/* PLAYERS */}

            {leaderboardData.map((player, index) => (
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
                whileHover={{
                  scale: 1.01,
                }}
                className={`leaderboard-row ${
                  player.rank <= 3 ? "top-player" : ""
                }`}
              >
                {/* RANK */}

                <div className="leaderboard-rank">
                  <span>{player.badge}</span>#{player.rank}
                </div>

                {/* USER */}

                <div className="leaderboard-user">
                  <img
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${player.username}`}
                    alt={player.username}
                  />

                  <div>
                    <h3>{player.username}</h3>

                    <p>Elite Player</p>
                  </div>
                </div>

                {/* XP */}

                <div className="leaderboard-xp">{player.xp}</div>

                {/* ACCURACY */}

                <div className="leaderboard-accuracy">{player.accuracy}</div>

                {/* STREAK */}

                <div className="leaderboard-streak">🔥 {player.streak}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          FOOTER BANNER
      ==================================== */}

      <section className="leaderboard-banner-section">
        <div className="container-premium">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="leaderboard-banner glass-card"
          >
            <div>
              <span>🚀 PREMIUM COMPETITION</span>
              <h2>Ready To Reach Rank #1?</h2>
              <p>
                Join daily quiz battles, earn XP and dominate the leaderboard.
              </p>
              <Link to="/categories" className="leaderboard-btn">
                Start Battle
              </Link>
            </div>

            <div className="leaderboard-banner-emoji">🏆</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
