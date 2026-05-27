// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Categories with icons
export const CATEGORIES = {
  movies: {
    icon: "🎬",
    name: "Movies",
    description: "Bollywood & Hollywood",
    color: "purple",
  },
  gaming: {
    icon: "🎮",
    name: "Gaming",
    description: "Video Games & Esports",
    color: "cyan",
  },
  "ai-ml": {
    icon: "🤖",
    name: "AI/ML",
    description: "Artificial Intelligence",
    color: "pink",
  },
  science: {
    icon: "🔬",
    name: "Science",
    description: "Physics, Chemistry, Biology",
    color: "green",
  },
  gk: {
    icon: "🌍",
    name: "General Knowledge",
    description: "World Facts & History",
    color: "orange",
  },
};

// Difficulty levels
export const DIFFICULTY = {
  easy: { label: "Easy", color: "green", points: 10 },
  medium: { label: "Medium", color: "yellow", points: 15 },
  hard: { label: "Hard", color: "red", points: 20 },
};

// Ranks
export const RANKS = {
  Bronze: { minXP: 0, color: "rank-bronze" },
  Silver: { minXP: 1000, color: "rank-silver" },
  Gold: { minXP: 2500, color: "rank-gold" },
  Platinum: { minXP: 5000, color: "rank-platinum" },
  Diamond: { minXP: 10000, color: "rank-diamond" },
};

// Quiz Modes
export const QUIZ_MODES = {
  classic: { label: "Classic", timePerQuestion: 15 },
  rapid: { label: "Rapid Fire", timePerQuestion: 10 },
  survival: { label: "Survival", timePerQuestion: 20 },
};

// Power-ups
export const POWERUPS = {
  "50-50": {
    name: "50-50",
    description: "Remove 2 wrong answers",
    defaultCount: 1,
  },
  skip: {
    name: "Skip",
    description: "Skip this question",
    defaultCount: 1,
  },
  hint: {
    name: "Hint",
    description: "Get a hint",
    defaultCount: 2,
  },
};

// Level XP requirements
export const LEVEL_XP = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 1500,
  7: 2000,
  8: 3000,
  9: 4000,
  10: 5000,
};
