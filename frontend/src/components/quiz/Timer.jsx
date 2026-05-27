import React from "react";
import { motion } from "framer-motion";

import { FiClock, FiZap, FiAlertTriangle } from "react-icons/fi";

const Timer = ({ timeLeft, totalTime }) => {
  /* =================================
     CALCULATIONS
  ================================= */

  const percentage = (timeLeft / totalTime) * 100;

  const isUrgent = percentage <= 25;

  const isCritical = percentage <= 10;

  /* =================================
     FORMAT TIME
  ================================= */

  const minutes = Math.floor(timeLeft / 60);

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  /* =================================
     TIMER THEMES
  ================================= */

  const timerTheme = isCritical
    ? {
        gradient: "from-red-600 via-rose-500 to-orange-500",

        bg: "from-red-500/20 via-rose-500/15 to-orange-500/20",

        border: "border-red-500/25",

        glow: "shadow-[0_0_45px_rgba(239,68,68,0.35)]",

        text: "text-red-300",

        label: "Critical Time ⚠️",
      }
    : isUrgent
      ? {
          gradient: "from-orange-500 via-amber-500 to-yellow-500",

          bg: "from-orange-500/20 via-amber-500/15 to-yellow-500/20",

          border: "border-orange-500/25",

          glow: "shadow-[0_0_40px_rgba(249,115,22,0.3)]",

          text: "text-orange-300",

          label: "Hurry Up 🔥",
        }
      : {
          gradient: "from-purple-600 via-fuchsia-500 to-cyan-400",

          bg: "from-purple-500/20 via-fuchsia-500/15 to-cyan-500/20",

          border: "border-purple-500/20",

          glow: "shadow-[0_0_35px_rgba(168,85,247,0.25)]",

          text: "text-cyan-300",

          label: "Timer Active ⏳",
        };

  return (
    <div className="relative w-full">
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className={`
          absolute
          inset-0
          rounded-[34px]
          blur-3xl
          ${timerTheme.glow}
        `}
      />

      {/* =================================
          MAIN CONTAINER
      ================================= */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[34px]
          border
          backdrop-blur-2xl
          bg-gradient-to-br
          ${timerTheme.bg}
          ${timerTheme.border}
          p-6
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
            [background-size:28px_28px]
          "
        />

        {/* ===============================
            FLOATING GLOW BALL
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
            TOP SECTION
        =============================== */}

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left */}
          <div>
            {/* Badge */}
            <div
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                text-xs
                font-bold
                uppercase
                tracking-[2px]
                backdrop-blur-xl
                ${timerTheme.border}
                ${timerTheme.text}
                bg-white/5
              `}
            >
              <FiZap />

              {timerTheme.label}
            </div>

            {/* Heading */}
            <h2
              className="
                mt-5
                text-3xl
                md:text-4xl
                font-black
                tracking-tight
                text-white
              "
            >
              Time Remaining
            </h2>

            {/* Description */}
            <p className="mt-3 text-white/55 text-sm leading-relaxed max-w-[450px]">
              Answer quickly and accurately to maximize your score multiplier
              and leaderboard ranking.
            </p>
          </div>

          {/* Right Timer */}
          <motion.div
            animate={
              isUrgent
                ? {
                    scale: [1, 1.04, 1],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className={`
              relative
              px-7
              py-6
              rounded-[32px]
              border
              backdrop-blur-xl
              bg-white/[0.05]
              ${timerTheme.border}
              ${timerTheme.glow}
            `}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[32px] bg-white/5 blur-xl" />

            <div className="relative flex items-center gap-5">
              {/* Clock Icon */}
              <motion.div
                animate={{
                  rotate: isUrgent ? [0, -8, 8, -8, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                }}
                className={`
                  w-20
                  h-20
                  rounded-[28px]
                  bg-gradient-to-br
                  ${timerTheme.gradient}
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                `}
              >
                <FiClock className="text-4xl text-white" />
              </motion.div>

              {/* Time */}
              <div>
                <p className="text-sm text-white/45 uppercase tracking-[2px]">
                  Countdown
                </p>

                <motion.h1
                  key={timeLeft}
                  initial={{
                    scale: 1.1,
                    opacity: 0.6,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className={`
                    mt-2
                    text-5xl
                    md:text-6xl
                    font-black
                    tracking-tight
                    ${timerTheme.text}
                  `}
                >
                  {minutes}:{seconds}
                </motion.h1>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===============================
            PROGRESS BAR
        =============================== */}

        <div className="relative mt-8">
          {/* Labels */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/55">Remaining Time</span>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                  border
                  backdrop-blur-xl
                  ${timerTheme.border}
                  ${timerTheme.text}
                  bg-white/5
                `}
              >
                {percentage.toFixed(0)}%
              </span>
            </div>

            <div className="text-sm font-semibold text-white/70">
              {timeLeft}s left
            </div>
          </div>

          {/* Bar Container */}
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
            {/* Background Glow */}
            <div className="absolute inset-0 bg-white/[0.02]" />

            {/* Animated Progress */}
            <motion.div
              initial={{
                width: "100%",
              }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
                ease: "linear",
              }}
              className={`
                relative
                h-full
                rounded-full
                overflow-hidden
                bg-gradient-to-r
                ${timerTheme.gradient}
                ${timerTheme.glow}
              `}
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
                  bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)]
                "
              />

              {/* Glow Dot */}
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

          {/* Milestones */}
          <div className="flex items-center justify-between mt-5">
            {[100, 75, 50, 25, 0].map((point) => (
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
                        percentage <= point
                          ? `
                            bg-gradient-to-r
                            ${timerTheme.gradient}
                            shadow-[0_0_20px_rgba(168,85,247,0.4)]
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
            ALERT SECTION
        =============================== */}

        {isUrgent && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`
              relative
              overflow-hidden
              mt-8
              rounded-[30px]
              border
              p-5
              backdrop-blur-xl
              ${
                isCritical
                  ? `
                    border-red-500/25
                    bg-gradient-to-r
                    from-red-500/20
                    via-rose-500/15
                    to-orange-500/20
                  `
                  : `
                    border-orange-500/25
                    bg-gradient-to-r
                    from-orange-500/20
                    via-amber-500/15
                    to-yellow-500/20
                  `
              }
            `}
          >
            {/* Shine */}
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
                bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)]
              "
            />

            {/* Content */}
            <div className="relative flex items-center gap-4">
              {/* Alert Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className={`
                  w-16
                  h-16
                  rounded-[24px]
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  ${
                    isCritical
                      ? `
                        bg-gradient-to-br
                        from-red-500
                        to-orange-500
                      `
                      : `
                        bg-gradient-to-br
                        from-orange-500
                        to-yellow-500
                      `
                  }
                `}
              >
                <FiAlertTriangle className="text-3xl text-white" />
              </motion.div>

              {/* Alert Text */}
              <div>
                <h3
                  className={`
                    text-2xl
                    font-black
                    ${isCritical ? "text-red-200" : "text-orange-200"}
                  `}
                >
                  {isCritical ? "Critical Time Remaining!" : "Hurry Up!"}
                </h3>

                <p className="mt-2 text-white/70 text-sm leading-relaxed">
                  Time is running out. Submit your answer quickly to avoid
                  losing valuable points and streak bonuses.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===============================
            FOOTER STATUS
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
            <span
              className={`
                w-3
                h-3
                rounded-full
                animate-pulse
                ${isUrgent ? "bg-red-400" : "bg-green-400"}
              `}
            />

            <span className="text-sm text-white/55">
              {isUrgent
                ? "High-pressure mode activated"
                : "Timer synchronized successfully"}
            </span>
          </div>

          {/* Right */}
          <div
            className={`
              px-4
              py-2
              rounded-full
              border
              text-xs
              uppercase
              tracking-[2px]
              font-bold
              backdrop-blur-xl
              ${timerTheme.border}
              ${timerTheme.text}
              bg-white/5
            `}
          >
            Real-Time Countdown
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
