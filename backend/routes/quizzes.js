const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const Quiz = require("../models/Quiz");

const User = require("../models/User");

const Question = require("../models/Question");

const { auth } = require("../middleware/auth");

/* ======================================================
   SUBMIT QUIZ
   POST /api/quizzes/submit
====================================================== */

router.post(
  "/submit",

  auth,

  async (req, res) => {
    try {
      const { category, questions, timeTaken } = req.body;

      if (!questions || questions.length === 0) {
        return res.status(400).json({
          success: false,
          error: "No quiz questions submitted",
        });
      }

      /* ====================================
         CALCULATE SCORE
      ==================================== */

      let score = 0;

      let correctAnswers = 0;

      let streak = 0;

      let maxStreak = 0;

      const processedQuestions = [];

      for (const q of questions) {
        const dbQuestion = await Question.findById(q.questionId);

        if (!dbQuestion) continue;

        const isCorrect = dbQuestion.correctOption === q.userAnswer;

        if (isCorrect) {
          score += dbQuestion.points;

          correctAnswers++;

          streak++;

          if (streak > maxStreak) {
            maxStreak = streak;
          }
        } else {
          streak = 0;
        }

        processedQuestions.push({
          questionId: dbQuestion._id,

          userAnswer: q.userAnswer,

          isCorrect,

          timeTaken: q.timeTaken || 0,

          points: isCorrect ? dbQuestion.points : 0,
        });
      }

      /* ====================================
         ACCURACY
      ==================================== */

      const accuracy = Math.round((correctAnswers / questions.length) * 100);

      /* ====================================
         XP + COINS
      ==================================== */

      const xpEarned = score + correctAnswers * 5;

      const coinsEarned = Math.floor(score / 10);

      /* ====================================
         SAVE QUIZ
      ==================================== */

      const quiz = await Quiz.create({
        userId: req.user._id,

        category,

        mode: "classic",

        questions: processedQuestions,

        score,

        totalQuestions: questions.length,

        correctAnswers,

        accuracy,

        timeTaken,

        xpEarned,

        coinsEarned,

        streak: maxStreak,
      });

      /* ====================================
         UPDATE USER
      ==================================== */

      const user = await User.findById(req.user._id);

      user.totalQuizzes += 1;

      user.totalCorrect += correctAnswers;

      user.xp += xpEarned;

      user.coins += coinsEarned;

      user.currentStreak = maxStreak;

      if (maxStreak > user.maxStreak) {
        user.maxStreak = maxStreak;
      }

      if (score > user.highestScore) {
        user.highestScore = score;
      }

      if (accuracy > user.bestAccuracy) {
        user.bestAccuracy = accuracy;
      }

      /* ====================================
         UPDATE RANK
      ==================================== */

      if (user.xp >= 10000) {
        user.rank = "Diamond";
      } else if (user.xp >= 5000) {
        user.rank = "Platinum";
      } else if (user.xp >= 2500) {
        user.rank = "Gold";
      } else if (user.xp >= 1000) {
        user.rank = "Silver";
      } else {
        user.rank = "Bronze";
      }

      /* ====================================
         LEVEL
      ==================================== */

      user.level = Math.floor(user.xp / 100) + 1;

      await user.save();

      /* ====================================
         RESPONSE
      ==================================== */

      res.json({
        success: true,

        message: "Quiz submitted successfully",

        result: {
          score,

          accuracy,

          correctAnswers,

          totalQuestions: questions.length,

          xpEarned,

          coinsEarned,

          streak: maxStreak,

          level: user.level,

          rank: user.rank,
        },

        quizId: quiz._id,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Quiz submission failed",
      });
    }
  },
);

/* ======================================================
   QUIZ HISTORY
====================================================== */

router.get(
  "/history",

  auth,

  async (req, res) => {
    try {
      const quizzes = await Quiz.find({
        userId: req.user._id,
      })
        .sort({
          completedAt: -1,
        })
        .limit(20);

      res.json({
        success: true,

        quizzes,
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
   SINGLE QUIZ
====================================================== */

router.get(
  "/:id",

  auth,

  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);

      if (!quiz) {
        return res.status(404).json({
          success: false,

          error: "Quiz not found",
        });
      }

      res.json({
        success: true,

        quiz,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,

        error: "Failed to fetch quiz",
      });
    }
  },
);

/* ======================================================
   USER STATS
====================================================== */

router.get(
  "/stats/me",

  auth,

  async (req, res) => {
    try {
      const totalQuizzes = await Quiz.countDocuments({
        userId: req.user._id,
      });

      const totalScore = await Quiz.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(req.user._id),
          },
        },

        {
          $group: {
            _id: null,

            total: {
              $sum: "$score",
            },
          },
        },
      ]);

      res.json({
        success: true,

        stats: {
          totalQuizzes,

          totalScore: totalScore[0]?.total || 0,

          highestScore: req.user.highestScore,

          bestAccuracy: req.user.bestAccuracy,

          level: req.user.level,

          xp: req.user.xp,

          rank: req.user.rank,
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
