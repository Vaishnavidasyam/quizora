import React from "react";
import { motion } from "framer-motion";

import { FiEye, FiSkipForward, FiHelpCircle, FiZap } from "react-icons/fi";

const PowerUpButton = ({ type, count, onClick, disabled }) => {
  /* =================================
     POWER UP CONFIG
  ================================= */

  const powerUps = {
    "50-50": {
      icon: FiEye,

      label: "50-50",

      description: "Eliminate two incorrect answers instantly.",

      gradient: "from-cyan-500 via-sky-500 to-blue-500",

      bg: "from-cyan-500/20 via-sky-500/15 to-blue-500/20",

      border: "border-cyan-500/25",

      glow: "group-hover:shadow-[0_0_45px_rgba(34,211,238,0.28)]",

      badge: "bg-cyan-500/20 text-cyan-200 border-cyan-400/20",
    },

    skip: {
      icon: FiSkipForward,

      label: "Skip",

      description: "Skip the current question without losing points.",

      gradient: "from-emerald-500 via-green-500 to-lime-500",

      bg: "from-emerald-500/20 via-green-500/15 to-lime-500/20",

      border: "border-emerald-500/25",

      glow: "group-hover:shadow-[0_0_45px_rgba(16,185,129,0.28)]",

      badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/20",
    },

    hint: {
      icon: FiHelpCircle,

      label: "Hint",

      description: "Reveal a smart hint for the correct answer.",

      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",

      bg: "from-purple-500/20 via-fuchsia-500/15 to-pink-500/20",

      border: "border-purple-500/25",

      glow: "group-hover:shadow-[0_0_45px_rgba(168,85,247,0.28)]",

      badge: "bg-purple-500/20 text-purple-200 border-purple-400/20",
    },
  };

  const powerUp = powerUps[type];

  const Icon = powerUp.icon;

  const isDisabled = disabled || count <= 0;

  return (
    <motion.div
      whileHover={
        !isDisabled
          ? {
              y: -6,
              scale: 1.03,
            }
          : {}
      }
      whileTap={
        !isDisabled
          ? {
              scale: 0.95,
            }
          : {}
      }
      className="group relative"
    >
      {/* =================================
          GLOW BACKGROUND
      ================================= */}

      {!isDisabled && (
        <div
          className={`
            absolute
            inset-0
            rounded-[28px]
            blur-2xl
            opacity-0
            transition-all
            duration-500
            ${powerUp.glow}
            group-hover:opacity-100
          `}
        />
      )}

      {/* =================================
          MAIN BUTTON
      ================================= */}

      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`
          relative
          overflow-hidden
          w-[110px]
          h-[115px]
          rounded-[28px]
          border
          backdrop-blur-2xl
          transition-all
          duration-500
          flex
          flex-col
          items-center
          justify-center
          gap-3
          ${
            isDisabled
              ? `
                bg-white/[0.03]
                border-white/10
                opacity-40
                cursor-not-allowed
              `
              : `
                bg-gradient-to-br
                ${powerUp.bg}
                ${powerUp.border}
                cursor-pointer
              `
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
            [background-size:22px_22px]
          "
        />

        {/* ===============================
            FLOATING GLOW BALL
        =============================== */}

        <div
          className="
            absolute
            -top-10
            -right-10
            w-28
            h-28
            rounded-full
            bg-white/10
            blur-3xl
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-700
          "
        />

        {/* ===============================
            ICON CONTAINER
        =============================== */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`
            relative
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            border
            ${
              isDisabled
                ? `
                  bg-white/5
                  border-white/10
                `
                : `
                  bg-gradient-to-br
                  ${powerUp.gradient}
                  border-white/10
                  shadow-xl
                `
            }
          `}
        >
          {/* Inner Glow */}
          {!isDisabled && (
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl" />
          )}

          {/* Icon */}
          <Icon className="relative text-3xl text-white" />
        </motion.div>

        {/* ===============================
            LABEL
        =============================== */}

        <div className="relative text-center">
          <h3
            className={`
              text-sm
              font-bold
              tracking-wide
              ${isDisabled ? "text-white/40" : "text-white"}
            `}
          >
            {powerUp.label}
          </h3>

          <p
            className={`
              text-[10px]
              mt-1
              leading-relaxed
              px-2
              ${isDisabled ? "text-white/25" : "text-white/55"}
            `}
          >
            {powerUp.description}
          </p>
        </div>

        {/* ===============================
            COUNT BADGE
        =============================== */}

        {count > 0 && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            className={`
              absolute
              top-3
              right-3
              min-w-[28px]
              h-7
              px-2
              rounded-full
              flex
              items-center
              justify-center
              border
              text-xs
              font-black
              backdrop-blur-xl
              ${powerUp.badge}
            `}
          >
            {count}
          </motion.div>
        )}

        {/* ===============================
            ENERGY ICON
        =============================== */}

        {!isDisabled && (
          <div
            className="
              absolute
              bottom-3
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-1
              text-[10px]
              text-white/40
            "
          >
            <FiZap className="text-yellow-400" />

            <span>Active</span>
          </div>
        )}

        {/* ===============================
            SHINE EFFECT
        =============================== */}

        {!isDisabled && (
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
              duration-[1400ms]
            "
          />
        )}
      </button>

      {/* =================================
          TOOLTIP
      ================================= */}

      {!isDisabled && (
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            bottom-[125%]
            opacity-0
            group-hover:opacity-100
            pointer-events-none
            transition-all
            duration-300
            z-50
          "
        >
          {/* Tooltip Box */}
          <div
            className="
              px-4
              py-3
              rounded-2xl
              border
              border-white/10
              bg-[#0B1120]/95
              backdrop-blur-2xl
              text-center
              shadow-2xl
              min-w-[220px]
            "
          >
            <h4 className="text-sm font-bold text-white">{powerUp.label}</h4>

            <p className="text-xs text-white/55 mt-1 leading-relaxed">
              {powerUp.description}
            </p>
          </div>

          {/* Tooltip Arrow */}
          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-full
              w-4
              h-4
              rotate-45
              bg-[#0B1120]
              border-r
              border-b
              border-white/10
            "
          />
        </div>
      )}
    </motion.div>
  );
};

export default PowerUpButton;
