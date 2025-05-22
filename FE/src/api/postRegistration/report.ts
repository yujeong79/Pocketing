// src/api/report.ts
import axiosInstance from '@/api/auth/axiosInstance';
import { ReportRequest } from '@/types/report';
import { ApiResponse } from '@/types/api';

export const reportMissingItem = async (
  payload: ReportRequest
): Promise<ApiResponse<null>> => {
  const formData = new FormData();
  formData.append('type', payload.type);
  formData.append('groupId', String(payload.groupId));

  if (payload.memberId !== undefined) {
    formData.append('memberId', String(payload.memberId));
  }
  if (payload.albumId !== undefined) {
    formData.append('albumId', String(payload.albumId));
  }
  if (payload.missingTitle) {
    formData.append('missingTitle', payload.missingTitle);
  }
  if (payload.image) {
    formData.append('image', payload.image);
  }

  const { data } = await axiosInstance.post<ApiResponse<null>>(
    '/api/report-missing',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};
