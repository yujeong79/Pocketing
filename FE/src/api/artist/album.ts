import axiosInstance from '@/api/auth/axiosInstance';
import { AlbumResponse } from '@/types/album';

// 앨범 목록 조회
export const fetchAlbums = async (groupId: number): Promise<AlbumResponse> => {
  const response = await axiosInstance.get(`/albums?groupId=${groupId}`);
  return response.data;
};
