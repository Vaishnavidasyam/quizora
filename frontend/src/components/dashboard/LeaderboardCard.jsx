import React from "react";
import { motion } from "framer-motion";

import { FiTrendingUp, FiZap, FiTarget } from "react-icons/fi";

const LeaderboardCard = ({ user, rank, isCurrentUser }) => {
  /* =================================
     TOP RANK STYLES
  ================================= */

  const topRanks = {
    1: {
      bg: "from-yellow-400/20 via-amber-500/10 to-orange-500/20",
      border: "border-yellow-400/30",
      glow: "shadow-[0_0_45px_rgba(250,204,21,0.25)]",
      icon: "👑",
      badge: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    },

    2: {
      bg: "from-slate-300/20 via-gray-400/10 to-zinc-500/20",
      border: "border-slate-300/20",
      glow: "shadow-[0_0_40px_rgba(203,213,225,0.18)]",
      icon: "🥈",
      badge: "bg-slate-300/15 text-slate-200 border-slate-300/20",
    },

    3: {
      bg: "from-orange-500/20 via-amber-600/10 to-yellow-700/20",
      border: "border-orange-400/20",
      glow: "shadow-[0_0_40px_rgba(251,146,60,0.18)]",
      icon: "🥉",
      badge: "bg-orange-500/15 text-orange-300 border-orange-500/20",
    },
  };

  const rankTheme = topRanks[rank] || {
    bg: "from-white/[0.04] to-white/[0.02]",
    border: "border-white/10",
    glow: "shadow-[0_0_35px_rgba(255,255,255,0.03)]",
    badge: "bg-white/5 text-white/60 border-white/10",
  };

  /* =================================
     PLAYER RANK COLORS
  ================================= */

  const playerRanks = {
    Diamond: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",

    Platinum: "bg-slate-300/15 text-slate-200 border-slate-300/20",

    Gold: "bg-yellow-400/15 text-yellow-300 border-yellow-400/20",

    Silver: "bg-gray-300/15 text-gray-200 border-gray-300/20",

    Bronze: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  };

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
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className="group relative"
    >
      {/* =================================
          GLOW BACKGROUND
      ================================= */}

      <div
        className={`
          absolute
          inset-0
          rounded-[32px]
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
          blur-2xl
          ${rankTheme.glow}
        `}
      />

      {/* =================================
          MAIN CARD
      ================================= */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[32px]
          border
          backdrop-blur-2xl
          bg-gradient-to-br
          ${rankTheme.bg}
          ${rankTheme.border}
          p-5
          transition-all
          duration-500
          ${
            isCurrentUser
              ? "ring-2 ring-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.18)]"
              : ""
          }
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
            CURRENT USER BADGE
        =============================== */}

        {isCurrentUser && (
          <div
            className="
              absolute
              top-4
              right-4
              px-3
              py-1
              rounded-full
              text-[10px]
              font-bold
              uppercase
              tracking-[2px]
              bg-purple-500/20
              border
              border-purple-500/30
              text-purple-300
            "
          >
            You
          </div>
        )}

        {/* ===============================
            MAIN CONTENT
        =============================== */}

        <div className="relative flex items-center gap-5">
          {/* ===============================
              RANK
          =============================== */}

          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 6,
            }}
            className={`
              relative
              w-16
              h-16
              rounded-3xl
              flex
              items-center
              justify-center
              text-2xl
              font-black
              border
              ${rankTheme.badge}
              backdrop-blur-xl
            `}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-white/10 blur-xl" />

            {/* Rank */}
            <span className="relative z-10">
              {rank <= 3 ? rankTheme.icon : `#${rank}`}
            </span>
          </motion.div>

          {/* ===============================
              AVATAR
          =============================== */}

          <div className="relative">
            {/* Avatar Glow */}
            <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl" />

            <div
              className="
                relative
                p-[2px]
                rounded-full
                bg-gradient-to-br
                from-purple-500
                via-pink-500
                to-cyan-500
              "
            >
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}`
                }
                alt={user.username}
                className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  bg-[#030712]
                "
              />
            </div>

            {/* Online Dot */}
            <span
              className="
                absolute
                bottom-1
                right-1
                w-4
                h-4
                rounded-full
                bg-green-400
                border-2
                border-[#030712]
                animate-pulse
              "
            />
          </div>

          {/* ===============================
              USER INFO
          =============================== */}

          <div className="flex-1">
            {/* Username */}
            <div className="flex items-center gap-3">
              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                {user.displayName || user.username}
              </h2>

              {rank <= 3 && (
                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[2px]
                    border
                    ${rankTheme.badge}
                  `}
                >
                  Elite
                </span>
              )}
            </div>

            {/* Handle */}
            <p className="text-sm text-white/45 mt-1">@{user.username}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {/* XP */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-2xl
                  bg-white/[0.04]
                  border
                  border-white/10
                "
              >
                <FiZap className="text-yellow-400" />

                <span className="text-sm font-semibold">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>

              {/* Level */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-2xl
                  bg-white/[0.04]
                  border
                  border-white/10
                "
              >
                <FiTrendingUp className="text-cyan-400" />

                <span className="text-sm font-semibold">
                  Level {user.level}
                </span>
              </div>

              {/* Accuracy */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-2xl
                  bg-white/[0.04]
                  border
                  border-white/10
                "
              >
                <FiTarget className="text-pink-400" />

                <span className="text-sm font-semibold">
                  {user.accuracy || 92}%
                </span>
              </div>
            </div>
          </div>

          {/* ===============================
              RIGHT SIDE
          =============================== */}

          <div className="hidden md:flex flex-col items-end gap-4">
            {/* Player Rank */}
            <div
              className={`
                px-4
                py-2
                rounded-2xl
                border
                text-sm
                font-bold
                backdrop-blur-xl
                ${playerRanks[user.rank] || playerRanks["Bronze"]}
              `}
            >
              {user.rank}
            </div>

            {/* Trophy Points */}
            <div className="text-right">
              <h3 className="text-2xl font-black text-white">
                {user.trophies || 240}
              </h3>

              <p className="text-xs uppercase tracking-[2px] text-white/35">
                Trophies
              </p>
            </div>
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

export default LeaderboardCard;
