import axios from 'axios';
import axiosInstance from '@/api/auth/axiosInstance';
import { S3ImageRequest, S3ImageResponse, PutImageRequest } from '@/types/s3Image';

export const postS3Image = async (request: S3ImageRequest): Promise<S3ImageResponse> => {
  const response = await axiosInstance.post('/files/presigned-url', request);
  return response.data;
};

export const putS3Image = async (request: PutImageRequest) => {
  const response = await axios.put(request.presignedUrl, request.uploadFile, {
    headers: request.header,
  });
  return response.data;
};
