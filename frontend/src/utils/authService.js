import { API_AUTH_BASE } from '../constants/constants.js';

export const registerUser = async userData => {
  const res = await fetch(`${API_AUTH_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Unable to register user');
  }
  return res.json();
};

export const loginUser = async ({ username, password }) => {
  console.log(username, password);
  const response = await fetch(`${API_AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
};

export const fetchUserProfile = async token => {
  const response = await fetch(`${API_AUTH_BASE}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return await response.json();
};
