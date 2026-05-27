import React, { useEffect } from "react";

import { motion } from "framer-motion";

import {
  FiAward,
  FiTrendingUp,
  FiTarget,
  FiZap,
  FiArrowRight,
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

import confetti from "canvas-confetti";

import "./Result.css";

const Result = () => {
  const location = useLocation();

  /* =========================================
     GET QUIZ DATA
  ========================================= */

  const {
    score = 0,

    totalQuestions = 10,

    category = "quiz",
  } = location.state || {};

  /* =========================================
     CALCULATIONS
  ========================================= */

  const total = totalQuestions * 10;

  const correctAnswers = Math.floor(score / 10);

  const wrongAnswers = totalQuestions - correctAnswers;

  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const xp = score * 2;

  const streak = correctAnswers;

  /* =========================================
     RANK SYSTEM
  ========================================= */

  let rank = "Bronze";

  if (score >= 90) rank = "Diamond";
  else if (score >= 70) rank = "Platinum";
  else if (score >= 50) rank = "Gold";
  else if (score >= 30) rank = "Silver";

  /* =========================================
     PERFORMANCE
  ========================================= */

  const performance =
    score >= 90
      ? {
          title: "Outstanding!",

          emoji: "🏆",
        }
      : score >= 70
        ? {
            title: "Excellent!",

            emoji: "🔥",
          }
        : score >= 50
          ? {
              title: "Good Job!",

              emoji: "⚡",
            }
          : {
              title: "Keep Practicing!",

              emoji: "💪",
            };

  /* =========================================
     CONFETTI
  ========================================= */

  useEffect(() => {
    confetti({
      particleCount: 180,

      spread: 90,

      origin: {
        y: 0.6,
      },
    });
  }, []);

  return (
    <div className="result-page">
      {/* GLOWS */}

      <div className="result-glow glow-left" />

      <div className="result-glow glow-right" />

      {/* MAIN */}

      <section className="result-section">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="result-card glass-card"
        >
          {/* EMOJI */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,

              duration: 2,
            }}
            className="result-emoji"
          >
            {performance.emoji}
          </motion.div>

          {/* TITLE */}

          <span className="result-badge">
            {category.toUpperCase()} QUIZ COMPLETED
          </span>

          <h1>
            {performance.title}

            <span className="gradient-text"> Champion</span>
          </h1>

          <p className="result-description">
            You completed the {category} quiz with an amazing performance.
          </p>

          {/* SCORE */}

          <div className="result-score-wrapper">
            <div className="result-score-circle">
              <div className="result-score-inner">
                <h2>{score}</h2>

                <span>/{total}</span>
              </div>
            </div>
          </div>

          {/* STATS */}

          <div className="result-stats">
            <div className="result-stat glass-card">
              <div className="stat-icon cyan">
                <FiTarget />
              </div>

              <div>
                <h3>{accuracy}%</h3>

                <p>Accuracy</p>
              </div>
            </div>

            <div className="result-stat glass-card">
              <div className="stat-icon green">
                <FiZap />
              </div>

              <div>
                <h3>+{xp}</h3>

                <p>XP Earned</p>
              </div>
            </div>

            <div className="result-stat glass-card">
              <div className="stat-icon blue">
                <FiTrendingUp />
              </div>

              <div>
                <h3>{streak}</h3>

                <p>Correct Streak</p>
              </div>
            </div>

            <div className="result-stat glass-card">
              <div className="stat-icon orange">
                <FiAward />
              </div>

              <div>
                <h3>{rank}</h3>

                <p>Rank</p>
              </div>
            </div>
          </div>

          {/* ANSWERS */}

          <div className="result-answer-summary">
            <div className="answer-box correct">
              <FiCheckCircle />

              <h2>{correctAnswers}</h2>

              <p>Correct Answers</p>
            </div>

            <div className="answer-box wrong">
              <FiXCircle />

              <h2>{wrongAnswers}</h2>

              <p>Wrong Answers</p>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="result-buttons">
            <Link to="/categories" className="result-btn-primary">
              <FiRefreshCw />
              Play Again
            </Link>

            <Link to="/leaderboard" className="result-btn-secondary">
              Leaderboard
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Result;
