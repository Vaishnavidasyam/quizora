import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ name, icon, quizCount, color = "purple", onClick }) => {
  /* =================================
     PREMIUM COLOR THEMES
  ================================= */

  const themes = {
    purple: {
      gradient: "from-purple-600/25 via-fuchsia-500/20 to-pink-500/20",

      border: "border-purple-500/20",

      glow: "shadow-[0_0_40px_rgba(168,85,247,0.18)]",

      iconBg: "from-purple-500 via-fuchsia-500 to-pink-500",

      badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",

      hoverGlow: "group-hover:shadow-purple-500/40",
    },

    cyan: {
      gradient: "from-cyan-500/25 via-sky-500/20 to-blue-500/20",

      border: "border-cyan-500/20",

      glow: "shadow-[0_0_40px_rgba(34,211,238,0.18)]",

      iconBg: "from-cyan-500 via-sky-500 to-blue-500",

      badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",

      hoverGlow: "group-hover:shadow-cyan-500/40",
    },

    pink: {
      gradient: "from-pink-500/25 via-rose-500/20 to-orange-500/20",

      border: "border-pink-500/20",

      glow: "shadow-[0_0_40px_rgba(236,72,153,0.18)]",

      iconBg: "from-pink-500 via-rose-500 to-orange-500",

      badge: "bg-pink-500/15 text-pink-300 border-pink-500/20",

      hoverGlow: "group-hover:shadow-pink-500/40",
    },

    green: {
      gradient: "from-emerald-500/25 via-green-500/20 to-lime-500/20",

      border: "border-emerald-500/20",

      glow: "shadow-[0_0_40px_rgba(16,185,129,0.18)]",

      iconBg: "from-emerald-500 via-green-500 to-lime-500",

      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",

      hoverGlow: "group-hover:shadow-emerald-500/40",
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
        y: -10,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
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
          group-hover:opacity-100
          ${theme.hoverGlow}
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
          ${theme.glow}
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
            TOP SECTION
        =============================== */}

        <div className="relative flex items-start justify-between">
          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            className={`
              relative
              w-20
              h-20
              rounded-3xl
              bg-gradient-to-br
              ${theme.iconBg}
              flex
              items-center
              justify-center
              text-4xl
              shadow-xl
            `}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl" />

            {/* Icon */}
            <span className="relative z-10">{icon}</span>
          </motion.div>

          {/* Quiz Count Badge */}
          <div
            className={`
              px-4
              py-2
              rounded-full
              border
              text-xs
              font-semibold
              backdrop-blur-xl
              ${theme.badge}
            `}
          >
            {quizCount}+ Quizzes
          </div>
        </div>

        {/* ===============================
            CONTENT
        =============================== */}

        <div className="relative mt-8">
          {/* Category Name */}
          <h2
            className="
              text-3xl
              font-black
              capitalize
              text-white
              tracking-tight
            "
          >
            {name}
          </h2>

          {/* Description */}
          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-white/60
              max-w-[260px]
            "
          >
            Explore trending quizzes, challenges, achievements & immersive
            gameplay in the
            {` ${name}`} universe.
          </p>

          {/* Divider */}
          <div
            className="
              w-full
              h-[1px]
              bg-white/10
              my-6
            "
          />

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            {/* Players */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#030712] bg-purple-500" />

                <div className="w-8 h-8 rounded-full border-2 border-[#030712] bg-cyan-500" />

                <div className="w-8 h-8 rounded-full border-2 border-[#030712] bg-pink-500" />
              </div>

              <span className="text-sm text-white/50 ml-2">12k+ Players</span>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                px-5
                py-2.5
                rounded-2xl
                text-sm
                font-semibold
                bg-white/10
                hover:bg-white/15
                border
                border-white/10
                transition-all
                duration-300
              "
            >
              Play Now →
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
            duration-[1200ms]
          "
        />
      </div>
    </motion.div>
  );
};

export default CategoryCard;
