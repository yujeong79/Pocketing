export interface S3ImageRequest {
  fileName: string | null;
  contentType: string;
}

export interface S3ImageResponse {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    presignedUrl: string;
  };
}

export interface PutImageRequest {
  presignedUrl: string;
  uploadFile: File;
  header: {
    'Content-Type': string;
  };
}
