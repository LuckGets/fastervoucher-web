import axios from 'axios';
import useAuthStore from '@/stores/auth-store';
import { jwtDecode } from 'jwt-decode';

const PORT: number = 8080;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api/v1/`,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      const decodedToken: { exp?: number } = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp <= currentTime) {
        try {
          const newAccessToken = await useAuthStore
            .getState()
            .actionRefreshToken();
          if (newAccessToken) {
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
        } catch (error) {
          console.warn('Failed to refresh token', error);
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
