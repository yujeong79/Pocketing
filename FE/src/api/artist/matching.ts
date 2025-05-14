import axiosInstance from '@/api/auth/axiosInstance';
import { MatchingRequestItem, MatchingResultItem } from '@/types/matching';
import { ApiResponse } from '@/types/api'; // 이미 갖고 있는 공통 타입

/**
 * 제미나이 결과로 받은 그룹/멤버 정보를 FastAPI 매칭 서버에 보내 매핑된 ID를 받아옴
 * @param payload 그룹명, 멤버명 배열
 * @returns 매핑된 groupId, memberId 결과 리스트
 */
export const resolveMatching = async (
  payload: MatchingRequestItem[]
): Promise<MatchingResultItem[]> => {
  try {
    const { data } = await axiosInstance.post<ApiResponse<MatchingResultItem[]>>(
      '/matching/resolve-ai',
      payload
    );
    return data.result;
  } catch (error: any) {
    console.error('[Matching Resolve 실패]', error);
    throw new Error(error.response?.data?.message || '매칭 요청 실패');
  }
};
