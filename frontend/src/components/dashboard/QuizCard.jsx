import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { FiPlay, FiStar, FiZap, FiUsers, FiTrendingUp } from "react-icons/fi";

const QuizCard = ({
  category,
  icon,
  description,
  questionCount,
  difficulty,
  color = "purple",
}) => {
  const navigate = useNavigate();

  /* =================================
     PREMIUM COLOR THEMES
  ================================= */

  const themes = {
    purple: {
      gradient: "from-purple-600/25 via-fuchsia-500/15 to-pink-500/20",

      border: "border-purple-500/20",

      glow: "group-hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]",

      iconBg: "from-purple-500 via-fuchsia-500 to-pink-500",

      badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",

      button: "from-purple-600 via-fuchsia-500 to-pink-500",
    },

    cyan: {
      gradient: "from-cyan-500/25 via-sky-500/15 to-blue-500/20",

      border: "border-cyan-500/20",

      glow: "group-hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]",

      iconBg: "from-cyan-500 via-sky-500 to-blue-500",

      badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",

      button: "from-cyan-500 via-sky-500 to-blue-500",
    },

    pink: {
      gradient: "from-pink-500/25 via-rose-500/15 to-orange-500/20",

      border: "border-pink-500/20",

      glow: "group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]",

      iconBg: "from-pink-500 via-rose-500 to-orange-500",

      badge: "bg-pink-500/15 text-pink-300 border-pink-500/20",

      button: "from-pink-500 via-rose-500 to-orange-500",
    },

    green: {
      gradient: "from-emerald-500/25 via-green-500/15 to-lime-500/20",

      border: "border-emerald-500/20",

      glow: "group-hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]",

      iconBg: "from-emerald-500 via-green-500 to-lime-500",

      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

      button: "from-emerald-500 via-green-500 to-lime-500",
    },

    orange: {
      gradient: "from-orange-500/25 via-amber-500/15 to-yellow-500/20",

      border: "border-orange-500/20",

      glow: "group-hover:shadow-[0_0_60px_rgba(249,115,22,0.25)]",

      iconBg: "from-orange-500 via-amber-500 to-yellow-500",

      badge: "bg-orange-500/15 text-orange-300 border-orange-500/20",

      button: "from-orange-500 via-amber-500 to-yellow-500",
    },
  };

  const theme = themes[color];

  return (
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
        duration: 0.5,
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => navigate(`/quiz?category=${category}`)}
      className="group relative cursor-pointer"
    >
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className={`
          absolute
          inset-0
          rounded-[34px]
          opacity-0
          transition-all
          duration-500
          blur-2xl
          ${theme.glow}
          group-hover:opacity-100
        `}
      />

      {/* =================================
          MAIN CARD
      ================================= */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[34px]
          border
          backdrop-blur-2xl
          bg-gradient-to-br
          ${theme.gradient}
          ${theme.border}
          p-7
          transition-all
          duration-500
        `}
      >
        {/* ===============================
            GRID OVERLAY
        =============================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            [background-size:30px_30px]
          "
        />

        {/* ===============================
            FLOATING GRADIENT BALL
        =============================== */}

        <div
          className="
            absolute
            -top-16
            -right-16
            w-44
            h-44
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        {/* ===============================
            TOP ROW
        =============================== */}

        <div className="relative flex items-start justify-between">
          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08,
            }}
            className={`
              relative
              w-24
              h-24
              rounded-[28px]
              bg-gradient-to-br
              ${theme.iconBg}
              flex
              items-center
              justify-center
              text-5xl
              shadow-2xl
            `}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[28px] bg-white/20 blur-xl" />

            <span className="relative z-10">{icon}</span>
          </motion.div>

          {/* Difficulty Badge */}
          <div
            className={`
              px-4
              py-2
              rounded-full
              border
              text-xs
              font-bold
              uppercase
              tracking-[2px]
              backdrop-blur-xl
              ${theme.badge}
            `}
          >
            {difficulty}
          </div>
        </div>

        {/* ===============================
            CONTENT
        =============================== */}

        <div className="relative mt-8">
          {/* Category */}
          <h2
            className="
              text-3xl
              font-black
              capitalize
              tracking-tight
              text-white
            "
          >
            {category}
          </h2>

          {/* Description */}
          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-white/60
              max-w-[280px]
            "
          >
            {description}
          </p>

          {/* ===============================
              STATS
          =============================== */}

          <div className="flex flex-wrap gap-3 mt-6">
            {/* Questions */}
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-2xl
                bg-white/[0.05]
                border
                border-white/10
              "
            >
              <FiZap className="text-yellow-400" />

              <span className="text-sm font-semibold">
                {questionCount}+ Questions
              </span>
            </div>

            {/* Players */}
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-2xl
                bg-white/[0.05]
                border
                border-white/10
              "
            >
              <FiUsers className="text-cyan-400" />

              <span className="text-sm font-semibold">12k+ Players</span>
            </div>

            {/* Rating */}
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-2xl
                bg-white/[0.05]
                border
                border-white/10
              "
            >
              <FiStar className="text-pink-400" />

              <span className="text-sm font-semibold">4.9 Rating</span>
            </div>
          </div>

          {/* ===============================
              BOTTOM ROW
          =============================== */}

          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/10
              flex
              items-center
              justify-between
            "
          >
            {/* Trending */}
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-green-400" />

              <span className="text-sm text-white/55">Trending Quiz</span>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className={`
                px-5
                py-3
                rounded-2xl
                font-semibold
                text-white
                flex
                items-center
                gap-2
                bg-gradient-to-r
                ${theme.button}
                shadow-xl
              `}
            >
              <FiPlay />
              Start Quiz
            </motion.button>
          </div>
        </div>

        {/* ===============================
            SHINE EFFECT
        =============================== */}

        <div
          className="
            absolute
            inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-700
            bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]
            translate-x-[-120%]
            group-hover:translate-x-[120%]
            ease-in-out
            duration-[1500ms]
          "
        />
      </div>
    </motion.div>
  );
};

export default QuizCard;
