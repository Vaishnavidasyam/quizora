const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: {
    type: String,
    enum: ["quiz", "streak", "score", "category", "social", "special"],
    required: true,
  },
  requirement: { type: String, required: true }, // e.g., "Score 1000 XP"
  xpReward: { type: Number, default: 50 },
  coinReward: { type: Number, default: 10 },
  rarity: {
    type: String,
    enum: ["common", "uncommon", "rare", "epic", "legendary"],
    default: "common",
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Achievement", achievementSchema);
