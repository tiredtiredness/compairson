import { API_BASE } from '../constants/constants.js';

export const updateUser = async (dataToUpdate, token) => {
  console.log(dataToUpdate);
  const response = await fetch(`${API_BASE}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToUpdate),
  });
  if (!response.ok) {
    throw new Error(`Error creating list: ${response.status}`);
  }
  return response.json();
};
