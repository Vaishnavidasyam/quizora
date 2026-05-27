// src/pages/Categories.jsx

import React from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { FiArrowRight, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";

import Footer from "../components/common/Footer";

import "./Categories.css";

const Categories = () => {
  const categories = [
    {
      title: "Movies",
      slug: "movies",
      icon: "🎬",
      quizzes: "120+ Quizzes",
      players: "18K Players",
      description:
        "Explore Hollywood, Bollywood, Marvel, DC and blockbuster universes.",
      color: "cyan",
    },

    {
      title: "Gaming",
      slug: "gaming",
      icon: "🎮",
      quizzes: "95+ Quizzes",
      players: "24K Players",
      description:
        "Battle through esports, consoles, retro classics and modern games.",
      color: "blue",
    },

    {
      title: "AI & ML",
      slug: "ai-ml",
      icon: "🤖",
      quizzes: "60+ Quizzes",
      players: "12K Players",
      description:
        "Challenge yourself with AI, Machine Learning and futuristic tech.",
      color: "green",
    },

    {
      title: "Science",
      slug: "science",
      icon: "🧪",
      quizzes: "80+ Quizzes",
      players: "9K Players",
      description:
        "Dive into physics, chemistry, biology and space exploration.",
      color: "orange",
    },

    {
      title: "Anime",
      slug: "anime",
      icon: "🔥",
      quizzes: "70+ Quizzes",
      players: "14K Players",
      description:
        "Naruto, One Piece, Attack on Titan and anime universes await.",
      color: "purple",
    },

    {
      title: "Music",
      slug: "music",
      icon: "🎵",
      quizzes: "55+ Quizzes",
      players: "8K Players",
      description:
        "Test your music taste with global hits and legendary artists.",
      color: "cyan",
    },

    {
      title: "General Knowledge",
      slug: "gk",
      icon: "🌍",
      quizzes: "140+ Quizzes",
      players: "30K Players",
      description:
        "World facts, history, geography and trending global topics.",
      color: "blue",
    },

    {
      title: "Memes",
      slug: "memes",
      icon: "😂",
      quizzes: "45+ Quizzes",
      players: "16K Players",
      description:
        "Internet culture, viral trends and meme madness challenges.",
      color: "green",
    },
  ];

  return (
    <div className="categories-page">
      {/* HERO */}

      <section className="categories-hero">
        <div className="categories-glow glow-left" />

        <div className="categories-glow glow-right" />

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
            className="categories-header"
          >
            <div className="categories-badge">
              <FiZap />
              PREMIUM QUIZ COLLECTION
            </div>

            <h1 className="categories-title">
              Explore Quiz
              <span className="gradient-text"> Categories</span>
            </h1>

            <p className="categories-description">
              Discover immersive quiz categories, challenge your skills and
              compete with players around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY GRID */}

      <section className="categories-grid-section">
        <div className="container-premium">
          <div className="categories-grid">
            {categories.map((category, index) => (
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
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -8,
                }}
                className={`category-card glass-card ${category.color}`}
              >
                {/* TOP */}

                <div className="category-top">
                  <div className="category-icon">{category.icon}</div>

                  <div className="category-live">LIVE</div>
                </div>

                {/* CONTENT */}

                <h2>{category.title}</h2>

                <p className="category-description">{category.description}</p>

                {/* STATS */}

                <div className="category-stats">
                  <div>
                    <FiTrendingUp />

                    {category.quizzes}
                  </div>

                  <div>
                    <FiUsers />

                    {category.players}
                  </div>
                </div>

                {/* BUTTON */}

                <Link
                  to={`/quiz?category=${category.slug}`}
                  className="category-btn"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Start Quiz
                  <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE BANNER */}

      <section className="categories-banner-section">
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
            className="categories-banner glass-card"
          >
            <div className="banner-content">
              <span>🚀 ELITE EXPERIENCE</span>

              <h2>Unlock Premium Quiz Battles</h2>

              <p>
                Compete in multiplayer arenas, earn achievements and climb the
                global leaderboard.
              </p>

              <Link to="/dashboard" className="btn-primary">
                Go To Dashboard
              </Link>
            </div>

            <div className="banner-emoji">🏆</div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
