// Centralized API utility for Local Service Finder backend
const API_BASE = 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  removeToken();
  localStorage.removeItem('user');
};

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

// Authentication
export const loginApi = async (email, password) => {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setToken(data.token);
    setUser(data.user);
  }
  return data;
};

export const registerApi = async (name, email, password, role) => {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role }),
  });
  if (data.token) {
    setToken(data.token);
    setUser(data.user);
  }
  return data;
};

export const getMeApi = () => request('/auth/me');

// Services & Discover
export const getCategoriesApi = () => request('/services/categories');
export const getTopRatedApi = () => request('/services/top-rated');
export const getStatsApi = () => request('/services/stats');
export const getServicesApi = (params = {}) => {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.location) query.append('location', params.location);
  const queryString = query.toString();
  return request(`/services${queryString ? `?${queryString}` : ''}`);
};

// Bookings
export const createBookingApi = (bookingData) =>
  request('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

export const getMyBookingsApi = () => request('/bookings/my-bookings');

// Reviews
export const addReviewApi = (serviceId, reviewData) =>
  request(`/services/${serviceId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
