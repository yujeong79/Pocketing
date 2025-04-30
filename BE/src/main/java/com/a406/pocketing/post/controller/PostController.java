package com.a406.pocketing.post.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;
import com.a406.pocketing.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ApiResponse<List<PostRegisterResponseDto>> registerPost(@RequestBody List<PostRegisterRequestDto> requestDtos) {
        Long userId = getCurrentUserId();
        return ApiResponse.of(SuccessStatus.POST_REGISTER_SUCCESS, postService.registerPost(userId, requestDtos));
    }

    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getUserId();
    }
}

