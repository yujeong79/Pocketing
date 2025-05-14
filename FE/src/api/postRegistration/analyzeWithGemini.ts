// src/api/postRegistration/analyzeWithGemini.ts
import fastapiJson from '@/api/postRegistration/axiosFastapiJson'
import { ApiResponse } from '@/types/api'
import { GeminiRequest, GeminiResult, GeminiResultItem } from '@/types/gemini'

/**
 * 크롭된 이미지 URL들을 기반으로 제미나이 AI 분석 결과를 반환합니다.
 * @param urls 크롭된 이미지의 S3 URL 배열
 * @returns 분석된 그룹명/멤버명 정보 목록
 */
export const analyzeWithGemini = async (urls: string[]): Promise<GeminiResultItem[]> => {
  const body: GeminiRequest = {
    postImageUrls: urls,
  }

  try {
    const { data } = await fastapiJson.post<ApiResponse<GeminiResult>>('/vision/analyze', body)
    return data.result.results
  } catch (err: any) {
    console.error('[Gemini 분석 실패]', err)
    throw new Error(err.response?.data?.message || 'Gemini 분석 요청 실패')
  }
}
