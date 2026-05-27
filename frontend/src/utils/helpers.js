// Calculate rank from XP
export const getRankFromXP = (xp) => {
  const ranks = [
    { name: "Diamond", minXP: 10000 },
    { name: "Platinum", minXP: 5000 },
    { name: "Gold", minXP: 2500 },
    { name: "Silver", minXP: 1000 },
    { name: "Bronze", minXP: 0 },
  ];

  for (const rank of ranks) {
    if (xp >= rank.minXP) return rank.name;
  }
  return "Bronze";
};

// Calculate level from XP
export const getLevelFromXP = (xp) => {
  const levels = [0, 100, 250, 500, 1000, 1500, 2000, 3000, 4000, 5000];

  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) return i + 1;
  }
  return 1;
};

// Format time
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get grade from accuracy
export const getGrade = (accuracy) => {
  if (accuracy >= 90)
    return { grade: "S+", emoji: "🏆", color: "text-yellow-400" };
  if (accuracy >= 80)
    return { grade: "S", emoji: "🌟", color: "text-orange-400" };
  if (accuracy >= 70)
    return { grade: "A", emoji: "⚡", color: "text-green-400" };
  if (accuracy >= 60)
    return { grade: "B", emoji: "👍", color: "text-cyan-400" };
  return { grade: "C", emoji: "📚", color: "text-white/60" };
};

// Calculate percentage
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return ((part / total) * 100).toFixed(2);
};

// Truncate text
export const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};
