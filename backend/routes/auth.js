const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

const User = require("../models/User");

/* ======================================================
   GENERATE JWT TOKEN
====================================================== */

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

/* ======================================================
   REGISTER
   POST /api/auth/register
====================================================== */

router.post(
  "/register",

  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),

    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  async (req, res) => {
    try {
      /* =========================
         VALIDATION
      ========================= */

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg,
        });
      }

      const { username, email, password, displayName } = req.body;

      /* =========================
         CHECK USER EXISTS
      ========================= */

      const existingEmail = await User.findOne({
        email,
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: "Email already registered",
        });
      }

      const existingUsername = await User.findOne({
        username,
      });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          error: "Username already taken",
        });
      }

      /* =========================
         CREATE USER
      ========================= */

      const user = new User({
        username,

        email,

        password,

        displayName: displayName || username,

        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,

        xp: 100,

        level: 1,

        coins: 50,

        rank: "Bronze",

        dailyLoginStreak: 1,
      });

      await user.save();

      /* =========================
         TOKEN
      ========================= */

      const token = generateToken(user._id);

      /* =========================
         RESPONSE
      ========================= */

      res.status(201).json({
        success: true,

        message: "Registration successful",

        token,

        user: {
          id: user._id,

          username: user.username,

          email: user.email,

          displayName: user.displayName,

          avatar: user.avatar,

          xp: user.xp,

          level: user.level,

          coins: user.coins,

          rank: user.rank,

          achievements: user.achievements,
        },
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      res.status(500).json({
        success: false,

        error: "Server error during registration",
      });
    }
  },
);

/* ======================================================
   LOGIN
   POST /api/auth/login
====================================================== */

router.post(
  "/login",

  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .normalizeEmail(),

    body("password").notEmpty().withMessage("Password required"),
  ],

  async (req, res) => {
    try {
      /* =========================
         VALIDATION
      ========================= */

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      /* =========================
         FIND USER
      ========================= */

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      /* =========================
         CHECK PASSWORD
      ========================= */

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      /* =========================
         UPDATE LOGIN STREAK
      ========================= */

      user.lastLoginDate = new Date();

      user.coins += 10;

      user.xp += 25;

      await user.save();

      /* =========================
         TOKEN
      ========================= */

      const token = generateToken(user._id);

      /* =========================
         RESPONSE
      ========================= */

      res.status(200).json({
        success: true,

        message: "Login successful",

        token,

        user: {
          id: user._id,

          username: user.username,

          email: user.email,

          displayName: user.displayName,

          avatar: user.avatar,

          xp: user.xp,

          level: user.level,

          coins: user.coins,

          rank: user.rank,

          totalQuizzes: user.totalQuizzes,

          highestScore: user.highestScore,

          achievements: user.achievements,
        },
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      res.status(500).json({
        success: false,

        error: "Server error during login",
      });
    }
  },
);

/* ======================================================
   GET CURRENT USER
   GET /api/auth/me
====================================================== */

router.get(
  "/me",

  async (req, res) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({
          success: false,
          error: "No token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("AUTH ME ERROR:", error);

      res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }
  },
);

/* ======================================================
   LOGOUT
====================================================== */

router.post("/logout", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Logout failed",
    });
  }
});

module.exports = router;
