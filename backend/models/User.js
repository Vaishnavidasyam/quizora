const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 6,
    },
    googleId: { type: String, unique: true, sparse: true },

    // Profile
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=random",
    },
    displayName: { type: String },
    bio: { type: String, maxlength: 100 },

    // Gamification
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    coins: { type: Number, default: 0 },
    rank: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
      default: "Bronze",
    },

    // Stats
    totalQuizzes: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    bestAccuracy: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },

    // Preferences
    favoriteCategory: { type: String },
    theme: { type: String, enum: ["dark", "light"], default: "dark" },

    // Daily tracking
    dailyLoginStreak: { type: Number, default: 0 },
    lastLoginDate: { type: Date },

    // Achievements
    achievements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
    ],

    // Social
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Update rank based on XP
userSchema.pre("save", function (next) {
  if (this.isModified("xp")) {
    if (this.xp >= 10000) this.rank = "Diamond";
    else if (this.xp >= 5000) this.rank = "Platinum";
    else if (this.xp >= 2500) this.rank = "Gold";
    else if (this.xp >= 1000) this.rank = "Silver";
    else this.rank = "Bronze";

    this.level = Math.floor(this.xp / 100) + 1;
  }
  next();
});

// Update accuracy stats
userSchema.methods.updateStats = function (correct, total, score) {
  this.totalQuizzes += 1;
  this.totalCorrect += correct;

  const accuracy = (correct / total) * 100;
  if (accuracy > this.bestAccuracy) this.bestAccuracy = accuracy;
  if (score > this.highestScore) this.highestScore = score;

  this.save();
};

// Add XP and coins
userSchema.methods.addRewards = function (xp, coins) {
  this.xp += xp;
  this.coins += coins;
  this.save();
};

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
