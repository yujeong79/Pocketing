package com.a406.pocketing.member.controller;

import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.member.dto.MemberResponseDto;
import com.a406.pocketing.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ApiResponse<List<MemberResponseDto>> getMembers(@RequestParam(required = false) Long groupId) {
        List<MemberResponseDto> members = memberService.getMembersByGroupId(groupId);
        return ApiResponse.of(SuccessStatus.MEMBER_LIST_FETCH_SUCCESS, members);
    }

    @GetMapping("/like")
    public ApiResponse<List<MemberResponseDto>> getLikedMembers(
            @RequestHeader("userId") Long userId,
            @RequestParam(required = false) Long groupId) {
        List<MemberResponseDto> members = memberService.getLikedMembersByGroupId(userId, groupId);
        return ApiResponse.of(SuccessStatus.MEMBER_LIKE_LIST_FETCH_SUCCESS, members);
    }
}
