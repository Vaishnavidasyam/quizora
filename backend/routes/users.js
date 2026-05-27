const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Quiz = require("../models/Quiz");

const { auth } = require("../middleware/auth");

/* ======================================================
   GET CURRENT USER PROFILE
   GET /api/users/me
====================================================== */

router.get(
  "/me",

  auth,

  async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .select("-password")
        .populate("achievements");

      res.json({
        success: true,

        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch profile",
      });
    }
  },
);

/* ======================================================
   UPDATE PROFILE
   PUT /api/users/update
====================================================== */

router.put(
  "/update",

  auth,

  async (req, res) => {
    try {
      const { displayName, bio, avatar, favoriteCategory, theme } = req.body;

      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,

          error: "User not found",
        });
      }

      if (displayName) user.displayName = displayName;

      if (bio) user.bio = bio;

      if (avatar) user.avatar = avatar;

      if (favoriteCategory) user.favoriteCategory = favoriteCategory;

      if (theme) user.theme = theme;

      await user.save();

      res.json({
        success: true,

        message: "Profile updated successfully",

        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to update profile",
      });
    }
  },
);

/* ======================================================
   USER PUBLIC PROFILE
====================================================== */

router.get(
  "/profile/:id",

  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("-password -email -googleId")
        .populate("achievements");

      if (!user) {
        return res.status(404).json({
          success: false,

          error: "User not found",
        });
      }

      res.json({
        success: true,

        user,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch user profile",
      });
    }
  },
);

/* ======================================================
   USER QUIZ HISTORY
====================================================== */

router.get(
  "/history",

  auth,

  async (req, res) => {
    try {
      const history = await Quiz.find({
        userId: req.user._id,
      })
        .sort({
          completedAt: -1,
        })
        .limit(20);

      res.json({
        success: true,

        history,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch history",
      });
    }
  },
);

/* ======================================================
   USER DASHBOARD STATS
====================================================== */

router.get(
  "/dashboard/stats",

  auth,

  async (req, res) => {
    try {
      const totalQuizzes = await Quiz.countDocuments({
        userId: req.user._id,
      });

      const quizzes = await Quiz.find({
        userId: req.user._id,
      });

      let avgAccuracy = 0;

      if (quizzes.length > 0) {
        avgAccuracy =
          quizzes.reduce((acc, q) => acc + q.accuracy, 0) / quizzes.length;
      }

      const recentQuiz = await Quiz.findOne({
        userId: req.user._id,
      }).sort({
        completedAt: -1,
      });

      res.json({
        success: true,

        stats: {
          xp: req.user.xp,

          level: req.user.level,

          rank: req.user.rank,

          coins: req.user.coins,

          totalQuizzes,

          highestScore: req.user.highestScore,

          bestAccuracy: req.user.bestAccuracy,

          avgAccuracy: Math.round(avgAccuracy),

          currentStreak: req.user.currentStreak,

          maxStreak: req.user.maxStreak,

          totalCorrect: req.user.totalCorrect,

          recentQuiz,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch dashboard stats",
      });
    }
  },
);

/* ======================================================
   SEARCH USERS
====================================================== */

router.get(
  "/search/query",

  async (req, res) => {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,

          error: "Search query required",
        });
      }

      const users = await User.find({
        $or: [
          {
            username: {
              $regex: q,
              $options: "i",
            },
          },

          {
            displayName: {
              $regex: q,
              $options: "i",
            },
          },
        ],
      })
        .limit(20)
        .select("username displayName avatar rank level xp");

      res.json({
        success: true,

        users,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "User search failed",
      });
    }
  },
);

/* ======================================================
   ADD FRIEND
====================================================== */

router.post(
  "/friends/add/:id",

  auth,

  async (req, res) => {
    try {
      const friend = await User.findById(req.params.id);

      if (!friend) {
        return res.status(404).json({
          success: false,

          error: "Friend not found",
        });
      }

      const user = await User.findById(req.user._id);

      if (user.friends.includes(friend._id)) {
        return res.status(400).json({
          success: false,

          error: "Already friends",
        });
      }

      user.friends.push(friend._id);

      await user.save();

      res.json({
        success: true,

        message: "Friend added successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to add friend",
      });
    }
  },
);

/* ======================================================
   GET FRIENDS
====================================================== */

router.get(
  "/friends/list",

  auth,

  async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate(
        "friends",
        "username displayName avatar rank level xp",
      );

      res.json({
        success: true,

        friends: user.friends,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch friends",
      });
    }
  },
);

/* ======================================================
   DELETE ACCOUNT
====================================================== */

router.delete(
  "/delete",

  auth,

  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);

      await Quiz.deleteMany({
        userId: req.user._id,
      });

      res.json({
        success: true,

        message: "Account deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to delete account",
      });
    }
  },
);

module.exports = router;
