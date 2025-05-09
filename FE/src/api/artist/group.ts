import axiosInstance from '@/api/auth/axiosInstance';
import { GroupResponse } from '@/types/group';

// 모든 그룹 조회(토큰 필요X)
export const getGroupsAll = async (): Promise<GroupResponse> => {
  const response = await axiosInstance.get('/groups/all');
  return response.data;
};

// 그룹 전체 조회(토큰 필요O)
export const fetchGroups = async (): Promise<GroupResponse>=> {
    const response = await axiosInstance.get('/groups');
    return response.data.result;
}
