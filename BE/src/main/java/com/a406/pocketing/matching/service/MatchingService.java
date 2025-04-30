package com.a406.pocketing.matching.service;

import com.a406.pocketing.matching.dto.AiResolveResponseDto;

public interface MatchingService {
    AiResolveResponseDto resolve(String groupName, String memberName);
}
