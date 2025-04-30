package com.a406.pocketing.matching.controller;

import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.matching.dto.AiResolveRequestDto;
import com.a406.pocketing.matching.dto.AiResolveResponseDto;
import com.a406.pocketing.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    @PostMapping("/resolve-ai")
    public ApiResponse<AiResolveResponseDto> resolveAi(@RequestBody AiResolveRequestDto dto) {
        return ApiResponse.of(SuccessStatus.AI_RESOLVE_SUCCESS,
                matchingService.resolve(dto.getGroupName(), dto.getMemberName()));
    }
}

