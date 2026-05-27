import React from "react";
import { motion } from "framer-motion";

import { FiZap, FiTarget, FiAward, FiClock } from "react-icons/fi";

const QuestionCard = ({ question, index, total }) => {
  /* =================================
     DIFFICULTY THEMES
  ================================= */

  const difficultyThemes = {
    easy: {
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

      glow: "shadow-[0_0_35px_rgba(16,185,129,0.2)]",
    },

    medium: {
      badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",

      glow: "shadow-[0_0_35px_rgba(234,179,8,0.2)]",
    },

    hard: {
      badge: "bg-red-500/15 text-red-300 border-red-500/20",

      glow: "shadow-[0_0_35px_rgba(239,68,68,0.2)]",
    },
  };

  const difficulty =
    difficultyThemes[question.difficulty?.toLowerCase()] ||
    difficultyThemes.easy;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -25,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative"
    >
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className={`
          absolute
          inset-0
          rounded-[38px]
          blur-3xl
          bg-purple-500/10
          ${difficulty.glow}
        `}
      />

      {/* =================================
          MAIN CARD
      ================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[38px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          p-8
          md:p-10
        "
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
            [background-size:32px_32px]
          "
        />

        {/* ===============================
            FLOATING GRADIENT BALLS
        =============================== */}

        <div
          className="
            absolute
            -top-16
            -right-16
            w-48
            h-48
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            w-40
            h-40
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        {/* ===============================
            TOP SECTION
        =============================== */}

        <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Side */}
          <div>
            {/* Question Label */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-purple-500/15
                border
                border-purple-500/20
                text-purple-300
                text-xs
                font-bold
                uppercase
                tracking-[2px]
              "
            >
              <FiZap />
              Quiz Challenge
            </div>

            {/* Main Heading */}
            <h1
              className="
                mt-5
                text-3xl
                md:text-5xl
                font-black
                leading-tight
                tracking-tight
                text-white
                max-w-[850px]
              "
            >
              {question.question}
            </h1>

            {/* Category */}
            {question.category && (
              <div className="mt-5 flex items-center gap-3">
                <span className="text-white/45 text-sm">Category</span>

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    text-cyan-300
                    text-sm
                    font-semibold
                    capitalize
                  "
                >
                  {question.category}
                </span>
              </div>
            )}
          </div>

          {/* Right Stats */}
          <div className="flex flex-wrap lg:flex-col gap-4">
            {/* Difficulty */}
            <div
              className={`
                px-5
                py-4
                rounded-3xl
                border
                backdrop-blur-xl
                ${difficulty.badge}
              `}
            >
              <div className="flex items-center gap-2">
                <FiTarget />

                <span className="text-xs uppercase tracking-[2px] font-bold">
                  Difficulty
                </span>
              </div>

              <h3 className="mt-2 text-lg font-black uppercase">
                {question.difficulty}
              </h3>
            </div>

            {/* Question Number */}
            <div
              className="
                px-5
                py-4
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-2">
                <FiClock className="text-pink-400" />

                <span className="text-xs uppercase tracking-[2px] text-white/40">
                  Progress
                </span>
              </div>

              <h3 className="mt-2 text-lg font-black">
                {index + 1}/{total}
              </h3>
            </div>
          </div>
        </div>

        {/* ===============================
            STATS SECTION
        =============================== */}

        <div
          className="
            relative
            mt-10
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          "
        >
          {/* Points */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              p-5
              rounded-3xl
              border
              border-yellow-500/20
              bg-yellow-500/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-yellow-500
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(234,179,8,0.35)]
                "
              >
                <FiAward className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-sm text-white/50">Reward Points</p>

                <h3 className="text-2xl font-black text-yellow-300">
                  {question.points} XP
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Accuracy */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              p-5
              rounded-3xl
              border
              border-cyan-500/20
              bg-cyan-500/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-blue-500
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(34,211,238,0.35)]
                "
              >
                <FiTarget className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-sm text-white/50">Success Rate</p>

                <h3 className="text-2xl font-black text-cyan-300">
                  {question.successRate || 78}%
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Bonus */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              p-5
              rounded-3xl
              border
              border-purple-500/20
              bg-purple-500/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-purple-500
                  via-fuchsia-500
                  to-pink-500
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(168,85,247,0.35)]
                "
              >
                <FiZap className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-sm text-white/50">Bonus Multiplier</p>

                <h3 className="text-2xl font-black text-purple-300">x2.5</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===============================
            BOTTOM STATUS
        =============================== */}

        <div
          className="
            relative
            mt-10
            pt-6
            border-t
            border-white/10
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-white/55">
              Real-time scoring and leaderboard tracking active
            </span>
          </div>

          {/* Right */}
          <div
            className="
              px-4
              py-2
              rounded-full
              bg-gradient-to-r
              from-purple-500/15
              to-cyan-500/15
              border
              border-purple-500/20
              text-xs
              uppercase
              tracking-[2px]
              font-bold
              text-purple-300
            "
          >
            Premium Quiz Experience
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
            hover:opacity-100
            transition-opacity
            duration-700
            bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]
            translate-x-[-120%]
            hover:translate-x-[120%]
            ease-in-out
            duration-[1600ms]
          "
        />
      </div>
    </motion.div>
  );
};

export default QuestionCard;
