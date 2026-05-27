const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  mode: {
    type: String,
    enum: [
      "classic",
      "rapid",
      "survival",
      "battle",
      "daily",
      "story",
      "spin",
      "multiplayer",
    ],
    default: "classic",
  },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      userAnswer: { type: Number },
      isCorrect: { type: Boolean },
      timeTaken: { type: Number },
      points: { type: Number },
    },
  ],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timeTaken: { type: Number }, // total time in seconds
  xpEarned: { type: Number, default: 0 },
  coinsEarned: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  rank: { type: String },
  completedAt: { type: Date, default: Date.now },
});

quizSchema.index({ userId: 1, completedAt: -1 });
quizSchema.index({ category: 1, score: -1 });

module.exports = mongoose.model("Quiz", quizSchema);
