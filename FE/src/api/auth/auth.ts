import axios from 'axios';

// 액세스 토큰 발급
export const getAccessToken = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reissue`, null, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    localStorage.removeItem('accessToken');
    throw error;
  }
};
