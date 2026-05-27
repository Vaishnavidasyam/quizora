const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "movies",
      "anime",
      "music",
      "celebrities",
      "memes",
      "gaming",
      "cricket",
      "emoji",
      "viral",
      "java",
      "python",
      "web",
      "ai-ml",
      "dbms",
      "cybersecurity",
      "science",
      "history",
      "geography",
      "gk",
      "math",
    ],
  },
  subCategory: { type: String },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  question: { type: String, required: true },
  questionType: {
    type: String,
    enum: ["text", "image", "video", "emoji"],
    default: "text",
  },
  mediaUrl: { type: String }, // for image/video questions
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  correctOption: { type: Number, required: true }, // index
  explanation: { type: String },
  points: { type: Number, default: 10 },
  timeLimit: { type: Number, default: 15 }, // seconds
  tags: [String],
  views: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

questionSchema.index({ category: 1, difficulty: 1 });
questionSchema.index({ isActive: 1 });

module.exports = mongoose.model("Question", questionSchema);
