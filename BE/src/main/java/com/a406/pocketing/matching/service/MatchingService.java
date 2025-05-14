package com.a406.pocketing.matching.service;

import com.a406.pocketing.matching.dto.AiResolveRequestDto;
import com.a406.pocketing.matching.dto.AiResolveResponseDto;

import java.util.List;

public interface MatchingService {
    // 개별 매칭 메소드 (내부 사용)
    AiResolveResponseDto resolve(String groupName, String memberName);

    // 리스트 매칭 메소드
    List<AiResolveResponseDto> resolveAll(List<AiResolveRequestDto> requests);
}
