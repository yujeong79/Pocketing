import axiosInstance from '../auth/axiosInstance';
import { MySaleListResult } from '@/types/mySale';

export const getMySales = async () => {
  const response = await axiosInstance.get<MySaleListResult>('/posts/available');
  return response.data;
};
