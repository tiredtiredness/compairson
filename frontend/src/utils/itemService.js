import { API_BASE } from '../constants/constants.js'

export const fetchItems = async (id, token) => {
  const response = await fetch(`${API_BASE}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Error fetching lists: ${response.status}`)
  }
  return response.json()
}
export const createItem = async (newItem, token) => {
  const response = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newItem),
  })
  if (!response.ok) {
    throw new Error(`Error creating list: ${response.status}`)
  }
  return response.json()
}
// export const fetchItem = async (id, token) => {};
// export const updateItems = async (id, token) => {};
export const deleteItem = async (id, token) => {
  const response = await fetch(`${API_BASE}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Error deleting list: ${response.status}`)
  }
}
