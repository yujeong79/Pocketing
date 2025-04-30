package com.a406.pocketing.user.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.user.dto.UserLikedGroupResponseDto;
import com.a406.pocketing.user.dto.UserLikedInfoRequestDto;
import com.a406.pocketing.user.dto.UserLikedMemberResponseDto;
import com.a406.pocketing.user.entity.UserLikedGroup;
import com.a406.pocketing.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.USER_LIKE_INFO_REGISTER_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    /**
     * 관심 그룹 및 멤버 등록
     * @param loginUser
     * @param likedInfoRequestDto
     * @return
     */
    @PostMapping("/like/info")
    public ApiResponse<?> registerLikedInfo(@AuthenticationPrincipal CustomUserDetails loginUser, @RequestBody UserLikedInfoRequestDto likedInfoRequestDto) {
        userService.registerLikedInfo(loginUser.getUserId(), likedInfoRequestDto);
        return ApiResponse.of(USER_LIKE_INFO_REGISTER_SUCCESS, null);
    }

    /**
     * 나의 관심 그룹 조회
     * @param loginUser
     * @return
     */
    @GetMapping("/like/group")
    public ApiResponse<?> getLikedGroup(@AuthenticationPrincipal CustomUserDetails loginUser) {
        List<UserLikedGroupResponseDto> userLikedGroupList = userService.getUserLikedGroup(loginUser.getUserId());
        return ApiResponse.of(SuccessStatus.GROUP_LIKE_LIST_FETCH_SUCCESS, userLikedGroupList);
    }

    /**
     * 나의 관심 그룹 내의 관심 멤버 조회
     * @param loginUser
     * @Param groupId
     * @return
     */
    @GetMapping("/like/member")
    public ApiResponse<?> getLikedMemberByGroup(@AuthenticationPrincipal CustomUserDetails loginUser, @RequestParam("groupId") Long groupId) {
        List<UserLikedMemberResponseDto> userLikedMemberList = userService.getUserLikedMemberByGroup(loginUser.getUserId(), groupId);
        return ApiResponse.of(SuccessStatus.MEMBER_LIKE_LIST_FETCH_SUCCESS, userLikedMemberList);
    }


}
