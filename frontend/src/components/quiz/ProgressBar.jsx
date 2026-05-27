import React from "react";
import { motion } from "framer-motion";

import { FiZap, FiTarget, FiAward } from "react-icons/fi";

const ProgressBar = ({ current, total }) => {
  /* =================================
     CALCULATIONS
  ================================= */

  const percentage = ((current + 1) / total) * 100;

  const remaining = total - (current + 1);

  /* =================================
     MILESTONE TEXT
  ================================= */

  const getMilestone = () => {
    if (percentage < 25) return "Getting Started 🚀";

    if (percentage < 50) return "Keep Going ⚡";

    if (percentage < 75) return "Halfway There 🔥";

    if (percentage < 100) return "Almost Finished 🎯";

    return "Quiz Completed 👑";
  };

  return (
    <div className="relative w-full">
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className="
          absolute
          inset-0
          rounded-[34px]
          blur-2xl
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
          rounded-[34px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          p-6
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
            TOP ROW
        =============================== */}

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left */}
          <div>
            {/* Label */}
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
              Quiz Progress
            </div>

            {/* Heading */}
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
              {getMilestone()}
            </h2>

            {/* Description */}
            <p className="mt-3 text-white/55 text-sm leading-relaxed max-w-[450px]">
              You're currently progressing through the quiz challenge. Keep your
              streak alive and dominate the leaderboard.
            </p>
          </div>

          {/* Right Stats */}
          <div className="flex flex-wrap gap-3">
            {/* Current */}
            <div
              className="
                px-5
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-2">
                <FiTarget className="text-cyan-400" />

                <span className="text-xs uppercase tracking-[2px] text-white/40">
                  Current
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-black">{current + 1}</h3>
            </div>

            {/* Remaining */}
            <div
              className="
                px-5
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-2">
                <FiAward className="text-pink-400" />

                <span className="text-xs uppercase tracking-[2px] text-white/40">
                  Remaining
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-black">{remaining}</h3>
            </div>
          </div>
        </div>

        {/* ===============================
            PROGRESS SECTION
        =============================== */}

        <div className="relative mt-8">
          {/* Labels */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/55">Question Progress</span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  text-cyan-300
                  text-xs
                  font-bold
                "
              >
                {percentage.toFixed(0)}%
              </span>
            </div>

            <div className="text-sm font-semibold text-white/70">
              {current + 1} / {total}
            </div>
          </div>

          {/* ===============================
              BAR CONTAINER
          =============================== */}

          <div
            className="
              relative
              w-full
              h-6
              rounded-full
              overflow-hidden
              bg-white/[0.04]
              border
              border-white/10
              backdrop-blur-xl
            "
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-white/[0.02]" />

            {/* Animated Progress */}
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                relative
                h-full
                rounded-full
                overflow-hidden
                bg-gradient-to-r
                from-purple-600
                via-fuchsia-500
                via-pink-500
                to-cyan-400
                shadow-[0_0_35px_rgba(168,85,247,0.45)]
              "
            >
              {/* Animated Shine */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-0
                  bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)]
                "
              />

              {/* Floating Glow */}
              <div
                className="
                  absolute
                  right-0
                  top-1/2
                  -translate-y-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white/40
                  blur-xl
                "
              />
            </motion.div>
          </div>

          {/* ===============================
              MILESTONES
          =============================== */}

          <div className="flex items-center justify-between mt-5">
            {[25, 50, 75, 100].map((point) => (
              <div key={point} className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className={`
                    w-4
                    h-4
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      percentage >= point
                        ? `
                          bg-gradient-to-r
                          from-purple-500
                          to-cyan-400
                          shadow-[0_0_20px_rgba(168,85,247,0.45)]
                        `
                        : `
                          bg-white/10
                          border
                          border-white/10
                        `
                    }
                  `}
                />

                {/* Label */}
                <span className="mt-2 text-[10px] uppercase tracking-[2px] text-white/35">
                  {point}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===============================
            BOTTOM STATUS
        =============================== */}

        <div
          className="
            mt-8
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
              Quiz session active and synced in real-time
            </span>
          </div>

          {/* Right */}
          <div
            className="
              px-4
              py-2
              rounded-full
              bg-purple-500/10
              border
              border-purple-500/20
              text-xs
              uppercase
              tracking-[2px]
              font-bold
              text-purple-300
            "
          >
            Premium Experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
