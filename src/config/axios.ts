import axios from 'axios';
import useAuthStore from '@/stores/auth-store';

const PORT: number = 8080;

const api = axios.create({
  baseURL: `http://localhost:${PORT}/api/v1/`,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const notifySubscribers = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.warn('No access token found!');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { actionRefreshToken, setTokens } = useAuthStore.getState();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await actionRefreshToken();

        if (newAccessToken) {
          setTokens(newAccessToken);
          api.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`;
          notifySubscribers(newAccessToken);
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.warn('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
