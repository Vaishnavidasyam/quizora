const express = require("express");

const router = express.Router();

const Achievement = require("../models/Achievement");

const User = require("../models/User");

const Quiz = require("../models/Quiz");

const { auth } = require("../middleware/auth");

/* ======================================================
   GET ALL ACHIEVEMENTS
====================================================== */

router.get(
  "/",

  async (req, res) => {
    try {
      const achievements = await Achievement.find({
        isActive: true,
      });

      res.json({
        success: true,

        achievements,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch achievements",
      });
    }
  },
);

/* ======================================================
   USER ACHIEVEMENTS
====================================================== */

router.get(
  "/me",

  auth,

  async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate("achievements");

      res.json({
        success: true,

        achievements: user.achievements,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch user achievements",
      });
    }
  },
);

/* ======================================================
   CHECK + UNLOCK ACHIEVEMENTS
====================================================== */

router.post(
  "/check",

  auth,

  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      const quizzes = await Quiz.find({
        userId: req.user._id,
      });

      const achievements = await Achievement.find();

      const unlocked = [];

      for (const achievement of achievements) {
        const alreadyUnlocked = user.achievements.includes(achievement._id);

        if (alreadyUnlocked) continue;

        let qualifies = false;

        /* ====================================
           QUIZ ACHIEVEMENTS
        ==================================== */

        if (achievement.name === "First Quiz" && quizzes.length >= 1) {
          qualifies = true;
        }

        if (achievement.name === "Quiz Master" && quizzes.length >= 10) {
          qualifies = true;
        }

        if (achievement.name === "Legend Player" && quizzes.length >= 50) {
          qualifies = true;
        }

        /* ====================================
           XP ACHIEVEMENTS
        ==================================== */

        if (achievement.name === "XP Hunter" && user.xp >= 1000) {
          qualifies = true;
        }

        if (achievement.name === "Diamond Elite" && user.xp >= 10000) {
          qualifies = true;
        }

        /* ====================================
           STREAK ACHIEVEMENTS
        ==================================== */

        if (achievement.name === "Hot Streak" && user.maxStreak >= 5) {
          qualifies = true;
        }

        if (achievement.name === "Unstoppable" && user.maxStreak >= 20) {
          qualifies = true;
        }

        /* ====================================
           SCORE ACHIEVEMENTS
        ==================================== */

        if (achievement.name === "Perfect Score" && user.highestScore >= 100) {
          qualifies = true;
        }

        /* ====================================
           UNLOCK
        ==================================== */

        if (qualifies) {
          user.achievements.push(achievement._id);

          user.xp += achievement.xpReward;

          user.coins += achievement.coinReward;

          unlocked.push(achievement);
        }
      }

      await user.save();

      res.json({
        success: true,

        unlocked,

        totalUnlocked: unlocked.length,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Achievement check failed",
      });
    }
  },
);

/* ======================================================
   CREATE DEFAULT ACHIEVEMENTS
====================================================== */

router.post(
  "/seed",

  async (req, res) => {
    try {
      await Achievement.deleteMany();

      const achievements = [
        {
          name: "First Quiz",

          description: "Complete your first quiz",

          icon: "🎯",

          category: "quiz",

          requirement: "Play 1 quiz",

          xpReward: 50,

          coinReward: 20,

          rarity: "common",
        },

        {
          name: "Quiz Master",

          description: "Complete 10 quizzes",

          icon: "🏆",

          category: "quiz",

          requirement: "Play 10 quizzes",

          xpReward: 200,

          coinReward: 100,

          rarity: "rare",
        },

        {
          name: "Legend Player",

          description: "Complete 50 quizzes",

          icon: "👑",

          category: "quiz",

          requirement: "Play 50 quizzes",

          xpReward: 1000,

          coinReward: 500,

          rarity: "legendary",
        },

        {
          name: "XP Hunter",

          description: "Reach 1000 XP",

          icon: "⚡",

          category: "score",

          requirement: "Earn 1000 XP",

          xpReward: 150,

          coinReward: 50,

          rarity: "epic",
        },

        {
          name: "Diamond Elite",

          description: "Reach Diamond Rank",

          icon: "💎",

          category: "score",

          requirement: "Earn 10000 XP",

          xpReward: 500,

          coinReward: 300,

          rarity: "legendary",
        },

        {
          name: "Hot Streak",

          description: "Get 5 correct answers in a row",

          icon: "🔥",

          category: "streak",

          requirement: "5 streak",

          xpReward: 100,

          coinReward: 40,

          rarity: "rare",
        },

        {
          name: "Unstoppable",

          description: "Get 20 correct answers in a row",

          icon: "🚀",

          category: "streak",

          requirement: "20 streak",

          xpReward: 300,

          coinReward: 150,

          rarity: "epic",
        },

        {
          name: "Perfect Score",

          description: "Score 100 points",

          icon: "🌟",

          category: "score",

          requirement: "100 score",

          xpReward: 200,

          coinReward: 100,

          rarity: "rare",
        },
      ];

      await Achievement.insertMany(achievements);

      res.json({
        success: true,

        message: "Achievements seeded successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to seed achievements",
      });
    }
  },
);

module.exports = router;
