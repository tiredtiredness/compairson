import { API_BASE } from '../constants/constants.js';

const getUrl = params => {
  const url = Object.entries(params)
    .filter(([, val]) => val?.length)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return url;
};

export const fetchLists = async ({ search, status, orderBy }, token) => {
  const url = getUrl({ search, status, orderBy });
  const response = await fetch(`${API_BASE}/lists${url ? `?${url}` : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.status}`);
  }
  return response.json();
};

export const fetchPublicLists = async (search, status, orderBy, token) => {
  const url = getUrl({ search, status, orderBy });
  const response = await fetch(
    `${API_BASE}/lists/public${url ? `?${url}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.status}`);
  }
  return response.json();
};

export const fetchList = async (listId, token) => {
  const response = await fetch(`${API_BASE}/lists/${listId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.status}`);
  }
  return response.json();
};

export const createList = async (newList, token) => {
  const response = await fetch(`${API_BASE}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newList),
  });
  if (!response.ok) {
    throw new Error(`Error creating list: ${response.status}`);
  }
  return response.json();
};

export const updateList = async (updatedList, token) => {
  const response = await fetch(`${API_BASE}/lists/${updatedList.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedList),
  });
  if (!response.ok) {
    throw new Error(`Error updating list: ${response.status}`);
  }
  return response.json();
};

export const deleteList = async (listId, token) => {
  const response = await fetch(`${API_BASE}/lists/${listId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting list: ${response.status}`);
  }
};
