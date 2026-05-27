import React from "react";
import { motion } from "framer-motion";

import { FiZap, FiTarget, FiTrendingUp, FiAward } from "react-icons/fi";

const ScoreDisplay = ({ score, streak, totalQuestions, currentQuestion }) => {
  /* =================================
     PROGRESS CALCULATION
  ================================= */

  const progress = (currentQuestion / totalQuestions) * 100;

  /* =================================
     STREAK LEVELS
  ================================= */

  const getStreakTheme = () => {
    if (streak >= 15) {
      return {
        text: "text-red-300",
        glow: "shadow-[0_0_40px_rgba(239,68,68,0.35)]",
        bg: "from-red-500/25 via-orange-500/20 to-yellow-500/20",
        label: "Legendary Streak 🔥",
      };
    }

    if (streak >= 10) {
      return {
        text: "text-orange-300",
        glow: "shadow-[0_0_35px_rgba(249,115,22,0.35)]",
        bg: "from-orange-500/25 via-amber-500/20 to-yellow-500/20",
        label: "Epic Streak ⚡",
      };
    }

    if (streak >= 5) {
      return {
        text: "text-yellow-300",
        glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
        bg: "from-yellow-500/25 via-amber-500/20 to-orange-500/20",
        label: "Hot Streak 🚀",
      };
    }

    return {
      text: "text-white",
      glow: "",
      bg: "from-white/[0.05] to-white/[0.02]",
      label: "Keep Going 💫",
    };
  };

  const streakTheme = getStreakTheme();

  return (
    <div className="relative">
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className="
          absolute
          inset-0
          rounded-[36px]
          blur-3xl
          bg-purple-500/10
        "
      />

      {/* =================================
          MAIN CONTAINER
      ================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          p-6
          md:p-7
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
            [background-size:28px_28px]
          "
        />

        {/* ===============================
            FLOATING GLOW BALLS
        =============================== */}

        <div
          className="
            absolute
            -top-16
            right-0
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
            HEADER
        =============================== */}

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          {/* Left */}
          <div>
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
              Live Quiz Stats
            </div>

            <h2
              className="
                mt-4
                text-3xl
                md:text-4xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-cyan-300
                via-purple-300
                to-pink-300
                bg-clip-text
                text-transparent
              "
            >
              Performance Dashboard
            </h2>

            <p className="mt-3 text-white/55 text-sm leading-relaxed">
              Real-time tracking of your score, streaks, and quiz progress.
            </p>
          </div>

          {/* Right Badge */}
          <div
            className={`
              px-5
              py-4
              rounded-3xl
              border
              backdrop-blur-xl
              bg-gradient-to-r
              ${streakTheme.bg}
              border-white/10
              ${streakTheme.glow}
            `}
          >
            <p className="text-xs uppercase tracking-[2px] text-white/45">
              Current Status
            </p>

            <h3
              className={`
                mt-2
                text-xl
                font-black
                ${streakTheme.text}
              `}
            >
              {streakTheme.label}
            </h3>
          </div>
        </div>

        {/* ===============================
            STATS GRID
        =============================== */}

        <div
          className="
            relative
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >
          {/* =================================
              SCORE CARD
          ================================= */}

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-yellow-500/20
              bg-gradient-to-br
              from-yellow-500/20
              via-amber-500/15
              to-orange-500/20
              p-6
              backdrop-blur-xl
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-yellow-500/5 blur-2xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-100/60">Total Score</p>

                  <motion.h2
                    key={score}
                    initial={{
                      scale: 1.4,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    className="
                      mt-2
                      text-5xl
                      font-black
                      text-yellow-300
                    "
                  >
                    {score}
                  </motion.h2>
                </div>

                <div
                  className="
                    w-20
                    h-20
                    rounded-[28px]
                    bg-gradient-to-br
                    from-yellow-500
                    to-orange-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_35px_rgba(234,179,8,0.35)]
                  "
                >
                  <FiAward className="text-4xl text-white" />
                </div>
              </div>

              {/* Footer */}
              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-yellow-100/70
                "
              >
                <FiTrendingUp />

                <span>Score increasing rapidly</span>
              </div>
            </div>
          </motion.div>

          {/* =================================
              STREAK CARD
          ================================= */}

          <motion.div
            whileHover={{
              y: -6,
            }}
            className={`
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-gradient-to-br
              ${streakTheme.bg}
              p-6
              backdrop-blur-xl
              ${streakTheme.glow}
            `}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-red-500/5 blur-2xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Answer Streak</p>

                  <motion.h2
                    key={streak}
                    initial={{
                      scale: 1.4,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    className={`
                      mt-2
                      text-5xl
                      font-black
                      ${streakTheme.text}
                    `}
                  >
                    {streak}
                  </motion.h2>
                </div>

                <motion.div
                  animate={
                    streak >= 5
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="
                    w-20
                    h-20
                    rounded-[28px]
                    bg-gradient-to-br
                    from-red-500
                    via-orange-500
                    to-yellow-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_35px_rgba(249,115,22,0.35)]
                  "
                >
                  <span className="text-4xl">🔥</span>
                </motion.div>
              </div>

              {/* Footer */}
              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/70
                "
              >
                <FiZap />

                <span>
                  {streak >= 5
                    ? `+${streak * 2} bonus points active`
                    : "Build your streak for bonuses"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================
              PROGRESS CARD
          ================================= */}

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-cyan-500/20
              bg-gradient-to-br
              from-cyan-500/20
              via-blue-500/15
              to-indigo-500/20
              p-6
              backdrop-blur-xl
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-2xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-100/60">Quiz Progress</p>

                  <h2
                    className="
                      mt-2
                      text-5xl
                      font-black
                      text-cyan-300
                    "
                  >
                    {currentQuestion}
                    <span className="text-white/35">/{totalQuestions}</span>
                  </h2>
                </div>

                <div
                  className="
                    w-20
                    h-20
                    rounded-[28px]
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_35px_rgba(34,211,238,0.35)]
                  "
                >
                  <FiTarget className="text-4xl text-white" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div
                  className="
                    w-full
                    h-3
                    rounded-full
                    bg-white/10
                    overflow-hidden
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="
                      relative
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-purple-500
                      shadow-[0_0_25px_rgba(34,211,238,0.35)]
                    "
                  >
                    {/* Shine */}
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-0
                        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)]
                      "
                    />
                  </motion.div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">Completion</span>

                  <span className="text-sm font-bold text-cyan-300">
                    {progress.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===============================
            BONUS SECTION
        =============================== */}

        {streak >= 5 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative
              overflow-hidden
              mt-8
              rounded-[30px]
              border
              border-orange-500/20
              bg-gradient-to-r
              from-orange-500/20
              via-red-500/15
              to-pink-500/20
              p-6
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(249,115,22,0.2)]
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-orange-500/10 blur-3xl" />

            {/* Animated Shine */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                inset-0
                bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)]
              "
            />

            {/* Content */}
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="
                    w-20
                    h-20
                    rounded-[28px]
                    bg-gradient-to-br
                    from-red-500
                    via-orange-500
                    to-yellow-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_35px_rgba(249,115,22,0.35)]
                  "
                >
                  <span className="text-4xl">🔥</span>
                </motion.div>

                <div>
                  <h2
                    className="
                      text-2xl
                      md:text-3xl
                      font-black
                      text-white
                    "
                  >
                    {streak} Question Streak!
                  </h2>

                  <p className="mt-2 text-white/70">
                    Your combo is active and earning extra rewards.
                  </p>
                </div>
              </div>

              {/* Right */}
              <div
                className="
                  px-6
                  py-4
                  rounded-3xl
                  bg-white/10
                  border
                  border-white/10
                  text-center
                "
              >
                <p className="text-xs uppercase tracking-[2px] text-white/45">
                  Bonus Reward
                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-black
                    text-yellow-300
                  "
                >
                  +{streak * 2} XP
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
