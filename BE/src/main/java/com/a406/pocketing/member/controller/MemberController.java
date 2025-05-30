package com.a406.pocketing.member.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.member.dto.MemberResponseDto;
import com.a406.pocketing.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 로그인한 유저의 멤버 전체 조회
     */
    @GetMapping
    public ApiResponse<List<MemberResponseDto>> getMembers(@RequestParam(required = false) Long groupId) {
        Long userId = getCurrentUserId();
        List<MemberResponseDto> members = memberService.getMembersByGroupId(userId, groupId);
        return ApiResponse.of(SuccessStatus.MEMBER_LIST_FETCH_SUCCESS, members);
    }

    /**
     * 로그인 하지 않은 유저의 (회원가입에서) 멤버 전체 조회
     */
    @GetMapping("/all")
    public  ApiResponse<List<MemberResponseDto>> getAllMembers(@RequestParam(required = false) Long groupId){
        List<MemberResponseDto> members = memberService.getAllMembersByGroupId(groupId);
        return ApiResponse.of(SuccessStatus.MEMBER_LIST_FETCH_SUCCESS, members);
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
