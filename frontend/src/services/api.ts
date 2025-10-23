import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  adminLogin: async (data: any) => {
    const response = await api.post('/auth/admin/login', data);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/auth/updateprofile', data);
    return response.data;
  },
};

// Pickup APIs
export const pickupAPI = {
  create: async (data: any) => {
    const response = await api.post('/pickups', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/pickups');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/pickups/${id}`);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/pickups/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/pickups/${id}`);
    return response.data;
  },
  track: async (trackingNumber: string) => {
    const response = await api.get(`/pickups/tracking/${trackingNumber}`);
    return response.data;
  },
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  getRecentPickups: async (limit?: number) => {
    const response = await api.get(`/dashboard/pickups/recent${limit ? `?limit=${limit}` : ''}`);
    return response.data;
  },
};

// Admin APIs
export const adminAPI = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getPickups: async (filters?: { status?: string; worker?: string; date?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.worker) params.append('worker', filters.worker);
    if (filters?.date) params.append('date', filters.date);
    const response = await api.get(`/admin/pickups${params.toString() ? `?${params.toString()}` : ''}`);
    return response.data;
  },
  assignWorker: async (pickupId: string, workerId: string) => {
    const response = await api.put(`/admin/pickups/${pickupId}/assign`, { workerId });
    return response.data;
  },
  updateStatus: async (pickupId: string, status: string) => {
    const response = await api.put(`/admin/pickups/${pickupId}/status`, { status });
    return response.data;
  },
  getWorkers: async () => {
    const response = await api.get('/admin/workers');
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  updateUserRole: async (userId: string, role: string) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },
  getPendingWorkers: async () => {
    const response = await api.get('/admin/workers/pending');
    return response.data;
  },
  approveWorker: async (workerId: string) => {
    const response = await api.put(`/admin/workers/${workerId}/approve`, {});
    return response.data;
  },
  rejectWorker: async (workerId: string) => {
    const response = await api.delete(`/admin/workers/${workerId}/reject`);
    return response.data;
  },
};

// Worker APIs
export const workerAPI = {
  getStats: async () => {
    const response = await api.get('/worker/stats');
    return response.data;
  },
  getPickups: async (status?: string) => {
    const response = await api.get(`/worker/pickups${status ? `?status=${status}` : ''}`);
    return response.data;
  },
  getPickupById: async (id: string) => {
    const response = await api.get(`/worker/pickups/${id}`);
    return response.data;
  },
  updateStatus: async (pickupId: string, status: string) => {
    const response = await api.put(`/worker/pickups/${pickupId}/status`, { status });
    return response.data;
  },
  updateWeight: async (pickupId: string, actualWeight: number) => {
    const response = await api.put(`/worker/pickups/${pickupId}/weight`, { actualWeight });
    return response.data;
  },
  updatePrice: async (pickupId: string, price: number) => {
    const response = await api.put(`/worker/pickups/${pickupId}/price`, { price });
    return response.data;
  },
  getAvailablePickups: async () => {
    const response = await api.get('/worker/available');
    return response.data;
  },
  pickOrder: async (pickupId: string) => {
    const response = await api.put(`/worker/pickups/${pickupId}/pick`, {});
    return response.data;
  },
  getAvailableCount: async () => {
    const response = await api.get('/worker/available');
    return response.data.count || 0;
  },
};

export default api;
