import axiosInstance from '@/api/auth/axiosInstance';
import { LikedGroupList, UserResponse } from '@/types/user';

// 관심 그룹 전체 조회
export const fetchLikedGroups = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get('/user/like/group');
  return response.data;
};

// 관심 그룹 내 관심 멤버 조회
export const fetchtLikedMembers = async (groupId: number): Promise<UserResponse> => {
  const response = await axiosInstance.get(`/user/like/member?groupId=${groupId}`);
  return response.data;
};

// 관심 그룹 및 멤버 수정
export const updateLikedMembers = async (likedGroupList: LikedGroupList): Promise<UserResponse> => {
  const response = await axiosInstance.post('/user/like/info', likedGroupList);
  return response.data;
};

// 관심 그룹 삭제
export const deleteLikedGroups = async (groupId: number): Promise<UserResponse> => {
  const response = await axiosInstance.delete(`/user/like/group?groupId=${groupId}`);
  return response.data;
};

// 관심 멤버 삭제
export const deleteLikedMembers = async (memberId: number): Promise<UserResponse> => {
  const response = await axiosInstance.delete(`/user/like/member?memberId=${memberId}`);
  return response.data;
};
