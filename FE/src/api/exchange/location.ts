import axiosInstance from '@/api/auth/axiosInstance';
import { ApiResponse } from '@/types/api';
import { LocationRequest, LocationResponse } from '@/types/location';

export const postLocation = async (location: LocationRequest): Promise<LocationResponse> => {
  const response = await axiosInstance.post<ApiResponse<LocationResponse>>(
    '/exchange/location',
    location
  );
  return response.data.result;
};
