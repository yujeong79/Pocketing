// src/api/postRegistration/uploadImageForCrop.ts
import fastapi from '@/api/postRegistration/axiosFastapi'
import { ApiResponse } from '@/types/api'
import { YoloCropResult, CroppedImage } from '@/types/yolo'

/**
 * FastAPI YOLO 백엔드에 이미지 파일을 업로드하여 크롭된 인물 이미지 URL들을 반환합니다.
 * @param file 업로드할 이미지 파일
 * @returns S3에 저장된 크롭 이미지 URL 리스트
 */
export const uploadImageForCrop = async (file: File): Promise<CroppedImage[]> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await fastapi.post<ApiResponse<YoloCropResult>>(
      '/upload/image',
      formData
    )
    return data.result.cropped_files
  } catch (error: any) {
    console.error('[YOLO 크롭 실패]', error)
    throw new Error(error.response?.data?.message || 'YOLO 크롭 요청 실패')
  }
}
