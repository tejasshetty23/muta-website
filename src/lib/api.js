import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getLeaderboard = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/leaderboard`);
    return data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
};
