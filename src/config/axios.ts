import axios from 'axios';
import useAuthStore from '@/stores/auth-store';

const PORT: number = 8080;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api/v1/`,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken, actionRefreshToken } = useAuthStore.getState();

    if (accessToken) {
      try {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        console.warn('Error setting Authorization header:', error);
      }
    }

    try {
      // Refresh token logic
      if (!accessToken) {
        const newAccessToken = await actionRefreshToken();
        if (newAccessToken) {
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
      }
    } catch (error) {
      console.warn('Failed to refresh token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
