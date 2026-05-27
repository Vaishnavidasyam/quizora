import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiStar, FiTarget } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center">
      {/* =========================
          Animated Background
      ========================== */}

      <div className="absolute inset-0">
        {/* Purple Glow */}
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[120px]" />

        {/* Cyan Glow */}
        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />

        {/* Pink Glow */}
        <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-pink-500/10 rounded-full blur-[100px]" />
      </div>

      {/* =========================
          Floating Particles
      ========================== */}

      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute top-24 left-20 text-cyan-400/40 text-4xl"
      >
        <FiZap />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 18, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-24 right-24 text-pink-400/40 text-5xl"
      >
        <FiStar />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-1/2 right-20 text-purple-400/30 text-4xl"
      >
        <FiTarget />
      </motion.div>

      {/* =========================
          Main Loader Card
      ========================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
          relative
          w-[92%]
          max-w-md
          p-10
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_0_60px_rgba(168,85,247,0.18)]
          text-center
        "
      >
        {/* =========================
            Animated Rings
        ========================== */}

        <div className="relative w-36 h-36 mx-auto mb-8">
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl" />

          {/* Ring 1 */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-0
              rounded-full
              border-[3px]
              border-purple-500/20
              border-t-purple-500
            "
          />

          {/* Ring 2 */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-3
              rounded-full
              border-[3px]
              border-cyan-500/20
              border-b-cyan-400
            "
          />

          {/* Center Logo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-gradient-to-br
                from-purple-600
                via-pink-500
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-lg
                shadow-purple-500/40
              "
            >
              <span className="text-4xl">🎯</span>
            </div>
          </motion.div>
        </div>

        {/* =========================
            Loading Text
        ========================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            text-4xl
            font-black
            tracking-tight
            mb-3
            bg-gradient-to-r
            from-cyan-300
            via-purple-300
            to-pink-300
            bg-clip-text
            text-transparent
          "
        >
          Loading QuizVerse
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="
            text-white/60
            text-sm
            md:text-base
            leading-relaxed
          "
        >
          Preparing immersive quizzes, challenges, rewards & entertainment for
          you...
        </motion.p>

        {/* =========================
            Progress Bar
        ========================== */}

        <div className="mt-8">
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{
                width: "0%",
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-purple-500
                via-pink-500
                to-cyan-400
                shadow-[0_0_20px_rgba(168,85,247,0.5)]
              "
            />
          </div>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              mt-3
              text-xs
              tracking-[3px]
              uppercase
              text-white/40
            "
          >
            Initializing Experience
          </motion.div>
        </div>

        {/* =========================
            Bottom Stats
        ========================== */}

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Servers Online</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Loading Assets</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
