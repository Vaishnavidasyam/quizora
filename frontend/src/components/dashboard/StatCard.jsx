import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, title, value, subtitle, color = "purple" }) => {
  /* =================================
     PREMIUM COLOR THEMES
  ================================= */

  const themes = {
    purple: {
      gradient: "from-purple-600/30 via-fuchsia-500/20 to-pink-500/20",

      border: "border-purple-500/20",

      glow: "group-hover:shadow-[0_0_55px_rgba(168,85,247,0.28)]",

      iconBg: "from-purple-500 via-fuchsia-500 to-pink-500",

      badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",

      value: "from-purple-200 via-fuchsia-100 to-pink-200",
    },

    cyan: {
      gradient: "from-cyan-500/30 via-sky-500/20 to-blue-500/20",

      border: "border-cyan-500/20",

      glow: "group-hover:shadow-[0_0_55px_rgba(34,211,238,0.28)]",

      iconBg: "from-cyan-500 via-sky-500 to-blue-500",

      badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",

      value: "from-cyan-100 via-sky-100 to-blue-200",
    },

    pink: {
      gradient: "from-pink-500/30 via-rose-500/20 to-orange-500/20",

      border: "border-pink-500/20",

      glow: "group-hover:shadow-[0_0_55px_rgba(236,72,153,0.28)]",

      iconBg: "from-pink-500 via-rose-500 to-orange-500",

      badge: "bg-pink-500/15 text-pink-300 border-pink-500/20",

      value: "from-pink-100 via-rose-100 to-orange-100",
    },

    green: {
      gradient: "from-emerald-500/30 via-green-500/20 to-lime-500/20",

      border: "border-emerald-500/20",

      glow: "group-hover:shadow-[0_0_55px_rgba(16,185,129,0.28)]",

      iconBg: "from-emerald-500 via-green-500 to-lime-500",

      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

      value: "from-emerald-100 via-green-100 to-lime-100",
    },

    yellow: {
      gradient: "from-yellow-500/30 via-amber-500/20 to-orange-500/20",

      border: "border-yellow-500/20",

      glow: "group-hover:shadow-[0_0_55px_rgba(234,179,8,0.28)]",

      iconBg: "from-yellow-500 via-amber-500 to-orange-500",

      badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",

      value: "from-yellow-100 via-amber-100 to-orange-100",
    },
  };

  const theme = themes[color];

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
        duration: 0.5,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="group relative cursor-pointer"
    >
      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div
        className={`
          absolute
          inset-0
          rounded-[32px]
          blur-2xl
          opacity-0
          transition-all
          duration-500
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
          rounded-[32px]
          border
          backdrop-blur-2xl
          bg-gradient-to-br
          ${theme.gradient}
          ${theme.border}
          p-6
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
            [background-size:28px_28px]
          "
        />

        {/* ===============================
            FLOATING GRADIENT BALL
        =============================== */}

        <div
          className="
            absolute
            -top-12
            -right-12
            w-40
            h-40
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        {/* ===============================
            CONTENT
        =============================== */}

        <div className="relative flex items-center justify-between">
          {/* ===============================
              LEFT CONTENT
          =============================== */}

          <div className="flex-1">
            {/* Title Badge */}
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
                ${theme.badge}
              `}
            >
              {title}
            </div>

            {/* Value */}
            <motion.h2
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className={`
                mt-5
                text-5xl
                font-black
                tracking-tight
                bg-gradient-to-r
                ${theme.value}
                bg-clip-text
                text-transparent
              `}
            >
              {value}
            </motion.h2>

            {/* Subtitle */}
            {subtitle && (
              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-white/60
                  max-w-[220px]
                "
              >
                {subtitle}
              </p>
            )}

            {/* Bottom Mini Stats */}
            <div className="flex items-center gap-4 mt-6">
              {/* Active */}
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
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs text-white/60">Active</span>
              </div>

              {/* Growth */}
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
                <span className="text-green-400 text-sm">↗</span>

                <span className="text-xs text-white/60">+24%</span>
              </div>
            </div>
          </div>

          {/* ===============================
              ICON SECTION
          =============================== */}

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08,
            }}
            className="
              relative
              flex
              items-center
              justify-center
            "
          >
            {/* Glow */}
            <div
              className={`
                absolute
                inset-0
                rounded-[30px]
                blur-2xl
                opacity-60
                bg-gradient-to-br
                ${theme.iconBg}
              `}
            />

            {/* Icon Box */}
            <div
              className={`
                relative
                w-24
                h-24
                rounded-[30px]
                bg-gradient-to-br
                ${theme.iconBg}
                flex
                items-center
                justify-center
                shadow-2xl
              `}
            >
              {/* Inner Glass */}
              <div
                className="
                  absolute
                  inset-[2px]
                  rounded-[28px]
                  bg-black/10
                  backdrop-blur-xl
                "
              />

              {/* Icon */}
              <Icon className="relative text-5xl text-white drop-shadow-lg" />
            </div>
          </motion.div>
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

export default StatCard;
