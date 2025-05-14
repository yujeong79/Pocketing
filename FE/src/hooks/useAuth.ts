import { useState, useEffect } from 'react';

interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (accessToken) {
      setToken(accessToken);
    }

    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('사용자 정보 파싱 실패:', error);
      }
    }
  }, []);

  return { user, token };
};
