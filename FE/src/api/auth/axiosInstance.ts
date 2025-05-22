import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logRequest, logResponse, logError } from '@/utils/logApi';
import { getAccessToken } from '@/api/auth/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accesstoken = localStorage.getItem('accessToken');

  if (accesstoken !== null) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  logRequest(config.url || '', config.method || '', config.data || '');
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response.config.url || '', response.status, response.data);
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const errorMessage = error?.response?.data;
    const originalRequest = error.config;

    logError(status, errorMessage || '');

    if (status === 401 && !originalRequest?.url?.includes('/api/notification/fcm-token')) {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          // 실패한 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.replace('/signin');
        throw error;
      }
    }
    throw error;
  }
);

export default axiosInstance;
