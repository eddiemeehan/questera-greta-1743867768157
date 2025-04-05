import axios from 'axios';

const API_BASE_URL = 'https://scoredate.co/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchProfiles = async () => {
  try {
    const response = await api.get('/profiles');
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
};

export const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const sendMatchRequest = async (userId, targetUserId) => {
  try {
    const response = await api.post('/matches', {
      userId,
      targetUserId
    });
    return response.data;
  } catch (error) {
    console.error('Error sending match request:', error);
    return null;
  }
};

export const fetchMatches = async (userId) => {
  try {
    const response = await api.get(`/matches/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};