import axiosInstance from '@/api/auth/axiosInstance';
import { GroupResponse } from '@/types/group';

// 모든 그룹 조회(토큰 필요X)
export const getGroupsAll = async (): Promise<GroupResponse> => {
  const response = await axiosInstance.get('/groups/all');
  return response.data;
};
