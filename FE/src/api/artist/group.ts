import axiosInstance from '@/api/auth/axiosInstance';
import { GroupResponse } from '@/types/group';

export const getGroups = async (): Promise<GroupResponse> => {
  try {
    const response = await axiosInstance.get('/groups');
    return response.data;
  } catch (error) {
    console.error('그룹 조회 실패:', error);
    throw error;
  }
};
