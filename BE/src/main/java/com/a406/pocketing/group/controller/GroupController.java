package com.a406.pocketing.group.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.group.dto.GroupResponseDto;
import com.a406.pocketing.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    /**
     * 그룹 전체 조회
     */
    @GetMapping
    public ApiResponse<List<GroupResponseDto>> getAllGroups() {
        Long userId = getCurrentUserId();
        List<GroupResponseDto> groups = groupService.getAllGroups(userId);
        return ApiResponse.of(SuccessStatus.GROUP_LIST_FETCH_SUCCESS, groups);
    }

    /**
     * 현재 로그인한 사용자의 userId 가져오기
     */
    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getUserId();
    }
}
