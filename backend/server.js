const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================================
   IMPORT ROUTES
========================================= */

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const quizRoutes = require("./routes/quizzes");
const leaderboardRoutes = require("./routes/leaderboard");
const achievementRoutes = require("./routes/achievements");
const questionRoutes = require("./routes/questions");

/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());

/* =========================================
   DATABASE CONNECTION
========================================= */

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });

/* =========================================
   API ROUTES
========================================= */

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/quizzes", quizRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/questions", questionRoutes);

/* =========================================
   HOME ROUTE
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    app: "QuizVerse Premium API",

    version: "2.0.0",

    status: "Running",

    endpoints: {
      auth: "/api/auth",

      users: "/api/users",

      quizzes: "/api/quizzes",

      leaderboard: "/api/leaderboard",

      achievements: "/api/achievements",

      questions: "/api/questions",
    },
  });
});

/* =========================================
   404 ROUTE
========================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "API Route Not Found",
  });
});

/* =========================================
   SERVER
========================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║              🎯 QUIZVERSE PREMIUM API                    ║
║                                                          ║
║   🚀 Server Running Successfully                         ║
║   🌐 http://localhost:${PORT}                             ║
║   📦 Environment: ${process.env.NODE_ENV || "development"}                   
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});
