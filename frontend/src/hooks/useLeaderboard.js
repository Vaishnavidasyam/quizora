import { useState, useEffect } from "react";
import API from "../api/axios";

export const useLeaderboard = (period = "global") => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/leaderboard?period=${period}`);
      setLeaderboard(data.leaderboard);
      setUserRank(data.userRank);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    loading,
    userRank,
    refreshLeaderboard: fetchLeaderboard,
  };
};

export default useLeaderboard;
