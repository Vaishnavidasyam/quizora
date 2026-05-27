import React from "react";
import { motion } from "framer-motion";

import { FiCheck, FiX, FiZap } from "react-icons/fi";

const OptionCard = ({
  option,
  index,
  isSelected,
  isAnswered,
  isCorrect,
  onClick,
}) => {
  /* =================================
     OPTION LETTERS
  ================================= */

  const optionLetter = String.fromCharCode(65 + index);

  /* =================================
     PREMIUM STATES
  ================================= */

  let styles = {
    container:
      "bg-white/[0.04] border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(168,85,247,0.12)]",

    icon: "bg-white/5 border-white/10 text-white/70",

    text: "text-white/85",

    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  };

  /* =================================
     SELECTED STATE
  ================================= */

  if (!isAnswered && isSelected) {
    styles = {
      container:
        "bg-gradient-to-r from-purple-500/20 via-fuchsia-500/15 to-pink-500/20 border-purple-500/30 shadow-[0_0_45px_rgba(168,85,247,0.22)]",

      icon: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 border-purple-400/40 text-white shadow-lg shadow-purple-500/30",

      text: "text-white",

      badge: "bg-purple-500/15 text-purple-200 border-purple-400/20",
    };
  }

  /* =================================
     CORRECT ANSWER
  ================================= */

  if (isAnswered && option.isCorrect) {
    styles = {
      container:
        "bg-gradient-to-r from-emerald-500/20 via-green-500/15 to-lime-500/20 border-emerald-400/30 shadow-[0_0_45px_rgba(16,185,129,0.22)]",

      icon: "bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 border-emerald-400/40 text-white shadow-lg shadow-emerald-500/30",

      text: "text-white",

      badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
    };
  }

  /* =================================
     WRONG ANSWER
  ================================= */

  if (isAnswered && isSelected && !option.isCorrect) {
    styles = {
      container:
        "bg-gradient-to-r from-red-500/20 via-rose-500/15 to-pink-500/20 border-red-400/30 shadow-[0_0_45px_rgba(239,68,68,0.2)]",

      icon: "bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 border-red-400/40 text-white shadow-lg shadow-red-500/30",

      text: "text-white",

      badge: "bg-red-500/15 text-red-200 border-red-400/20",
    };
  }

  /* =================================
     DIM OTHER OPTIONS
  ================================= */

  const faded = isAnswered && !option.isCorrect && !isSelected;

  return (
    <motion.button
      initial={{
        opacity: 0,
        x: -25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
      }}
      whileHover={
        !isAnswered
          ? {
              scale: 1.015,
              x: 6,
            }
          : {}
      }
      whileTap={
        !isAnswered
          ? {
              scale: 0.985,
            }
          : {}
      }
      onClick={!isAnswered ? onClick : undefined}
      disabled={isAnswered}
      className={`
        group
        relative
        overflow-hidden
        w-full
        rounded-[28px]
        border
        backdrop-blur-2xl
        transition-all
        duration-500
        p-5
        text-left
        ${styles.container}
        ${faded ? "opacity-40 scale-[0.98]" : "opacity-100"}
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
          [background-size:26px_26px]
        "
      />

      {/* ===============================
          FLOATING GLOW
      =============================== */}

      <div
        className="
          absolute
          -top-12
          -right-12
          w-36
          h-36
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
          MAIN CONTENT
      =============================== */}

      <div className="relative flex items-center gap-5">
        {/* ===============================
            OPTION LETTER
        =============================== */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`
            relative
            min-w-[64px]
            w-16
            h-16
            rounded-2xl
            border
            flex
            items-center
            justify-center
            text-xl
            font-black
            transition-all
            duration-500
            ${styles.icon}
          `}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl opacity-60" />

          {/* Letter */}
          <span className="relative z-10">{optionLetter}</span>
        </motion.div>

        {/* ===============================
            OPTION TEXT
        =============================== */}

        <div className="flex-1">
          {/* Badge */}
          <div
            className={`
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              border
              text-[10px]
              uppercase
              tracking-[2px]
              font-bold
              backdrop-blur-xl
              mb-3
              ${styles.badge}
            `}
          >
            <FiZap />
            Quiz Option
          </div>

          {/* Text */}
          <p
            className={`
              text-lg
              md:text-[19px]
              font-medium
              leading-relaxed
              transition-all
              duration-300
              ${styles.text}
            `}
          >
            {option.text}
          </p>
        </div>

        {/* ===============================
            STATUS ICONS
        =============================== */}

        <div className="flex items-center justify-center">
          {/* Correct */}
          {isAnswered && option.isCorrect && (
            <motion.div
              initial={{
                scale: 0,
                rotate: -30,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-emerald-500/20
                  border
                  border-emerald-400/30
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(16,185,129,0.25)]
                "
            >
              <FiCheck className="text-2xl text-emerald-300" />
            </motion.div>
          )}

          {/* Wrong */}
          {isAnswered && isSelected && !option.isCorrect && (
            <motion.div
              initial={{
                scale: 0,
                rotate: 30,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-red-500/20
                  border
                  border-red-400/30
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_25px_rgba(239,68,68,0.25)]
                "
            >
              <FiX className="text-2xl text-red-300" />
            </motion.div>
          )}
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
          duration-[1400ms]
        "
      />
    </motion.button>
  );
};

export default OptionCard;
