import axiosInstance from '@/api/auth/axiosInstance';
import { MemberResponse } from '@/types/member';

// 그룹별 멤버 조회(토큰 필요X)
export const fetchMembersAll = async (groupId: number): Promise<MemberResponse> => {
  const response = await axiosInstance.get(`/members/all?groupId=${groupId}`);
  return response.data;
};

// 그룹별 멤버 조회(토큰 필요O)
export const fetchMembers = async (groupId: number): Promise<MemberResponse> => {
  const response = await axiosInstance.get('/members', {
    params: { groupId },
  });
  return response.data;
};
