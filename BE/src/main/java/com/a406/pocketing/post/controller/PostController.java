package com.a406.pocketing.post.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;
import com.a406.pocketing.post.dto.PostResponseDto;
import com.a406.pocketing.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ApiResponse<Page<PostResponseDto>> getPosts(
            @RequestParam Long memberId,
            @RequestParam(required = false) Long albumId,
            @PageableDefault(size = 10, page = 0) Pageable pageable
    ) {
        return ApiResponse.of(SuccessStatus.POST_LIST_FETCH_SUCCESS, postService.getPosts(memberId, albumId, pageable));
    }


    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getUserId();
    }
}

