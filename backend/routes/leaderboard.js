const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Quiz = require("../models/Quiz");

/* ======================================================
   GLOBAL LEADERBOARD
   GET /api/leaderboard/global
====================================================== */

router.get(
  "/global",

  async (req, res) => {
    try {
      const users = await User.find()
        .sort({
          xp: -1,
        })
        .limit(50)
        .select("-password -googleId");

      const leaderboard = users.map((user, index) => ({
        rank: index + 1,

        id: user._id,

        username: user.username,

        displayName: user.displayName,

        avatar: user.avatar,

        xp: user.xp,

        level: user.level,

        coins: user.coins,

        totalQuizzes: user.totalQuizzes,

        highestScore: user.highestScore,

        rankTitle: user.rank,
      }));

      res.json({
        success: true,

        leaderboard,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch leaderboard",
      });
    }
  },
);

/* ======================================================
   WEEKLY LEADERBOARD
====================================================== */

router.get(
  "/weekly",

  async (req, res) => {
    try {
      const weekAgo = new Date();

      weekAgo.setDate(weekAgo.getDate() - 7);

      const weekly = await Quiz.aggregate([
        {
          $match: {
            completedAt: {
              $gte: weekAgo,
            },
          },
        },

        {
          $group: {
            _id: "$userId",

            totalScore: {
              $sum: "$score",
            },

            quizzesPlayed: {
              $sum: 1,
            },

            avgAccuracy: {
              $avg: "$accuracy",
            },
          },
        },

        {
          $sort: {
            totalScore: -1,
          },
        },

        {
          $limit: 20,
        },
      ]);

      const populated = await User.populate(weekly, {
        path: "_id",

        select: "username displayName avatar level rank",
      });

      const leaderboard = populated.map((entry, index) => ({
        rank: index + 1,

        user: entry._id,

        totalScore: entry.totalScore,

        quizzesPlayed: entry.quizzesPlayed,

        avgAccuracy: Math.round(entry.avgAccuracy),
      }));

      res.json({
        success: true,

        leaderboard,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch weekly leaderboard",
      });
    }
  },
);

/* ======================================================
   CATEGORY LEADERBOARD
====================================================== */

router.get(
  "/category/:category",

  async (req, res) => {
    try {
      const { category } = req.params;

      const categoryData = await Quiz.aggregate([
        {
          $match: {
            category,
          },
        },

        {
          $group: {
            _id: "$userId",

            highestScore: {
              $max: "$score",
            },

            avgAccuracy: {
              $avg: "$accuracy",
            },

            totalQuizzes: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            highestScore: -1,
          },
        },

        {
          $limit: 20,
        },
      ]);

      const populated = await User.populate(categoryData, {
        path: "_id",

        select: "username displayName avatar rank level",
      });

      const leaderboard = populated.map((entry, index) => ({
        rank: index + 1,

        user: entry._id,

        highestScore: entry.highestScore,

        avgAccuracy: Math.round(entry.avgAccuracy),

        totalQuizzes: entry.totalQuizzes,
      }));

      res.json({
        success: true,

        category,

        leaderboard,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch category leaderboard",
      });
    }
  },
);

/* ======================================================
   TOP SCORES
====================================================== */

router.get(
  "/top-scores",

  async (req, res) => {
    try {
      const topScores = await Quiz.find()
        .sort({
          score: -1,
        })
        .limit(20)
        .populate("userId", "username displayName avatar rank level");

      res.json({
        success: true,

        topScores,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch top scores",
      });
    }
  },
);

/* ======================================================
   TOP STREAKS
====================================================== */

router.get(
  "/streaks",

  async (req, res) => {
    try {
      const users = await User.find()
        .sort({
          maxStreak: -1,
        })
        .limit(20)
        .select("username displayName avatar maxStreak level rank");

      const leaderboard = users.map((user, index) => ({
        rank: index + 1,

        user,

        maxStreak: user.maxStreak,
      }));

      res.json({
        success: true,

        leaderboard,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch streak leaderboard",
      });
    }
  },
);

/* ======================================================
   DASHBOARD STATS
====================================================== */

router.get(
  "/stats",

  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();

      const totalQuizzes = await Quiz.countDocuments();

      const highestXP = await User.findOne()
        .sort({
          xp: -1,
        })
        .select("displayName xp");

      const highestScore = await Quiz.findOne()
        .sort({
          score: -1,
        })
        .select("score accuracy");

      res.json({
        success: true,

        stats: {
          totalUsers,

          totalQuizzes,

          topPlayer: highestXP,

          topScore: highestScore,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch stats",
      });
    }
  },
);

module.exports = router;
