package com.a406.pocketing.post.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.post.dto.*;
import com.a406.pocketing.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

    @PutMapping
    public ApiResponse<?> updatePostStatus(@AuthenticationPrincipal CustomUserDetails loginUser, @RequestBody PostUpdateStatusRequestDto postUpdateStatusRequestDto) {
        postService.updatePostStatus(loginUser.getUserId(), postUpdateStatusRequestDto);
        return ApiResponse.of(SuccessStatus.POST_UPDATE_STATUS_SUCCESS, null);
    }

    @GetMapping("/sellers")
    public ApiResponse<SellerListResponseDto> getSellersByCardId(
            @RequestParam Long cardId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ApiResponse.of(SuccessStatus.SELLER_LIST_FETCH_SUCCESS,
                postService.getSellersByCardId(cardId, pageable));
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostDetailResponseDto> getPostDetail(@PathVariable Long postId) {
        Long currentUserId = getCurrentUserId();
        return ApiResponse.of(SuccessStatus.POST_DETAIL_FETCH_SUCCESS,
                postService.getPostDetail(postId, currentUserId));
    }

    @PutMapping("/{postId}")
    public ApiResponse<Void> updatePost(@PathVariable Long postId, @RequestBody PostUpdateRequestDto requestDto) {
        Long currentUserId = getCurrentUserId();
        postService.updatePost(postId, currentUserId, requestDto);
        return ApiResponse.of(SuccessStatus.POST_UPDATE_SUCCESS, null);
    }

    @DeleteMapping("/{postId}")
    public ApiResponse<Void> deletePost(@PathVariable Long postId) {
        Long currentUserId = getCurrentUserId();
        postService.deletePost(postId, currentUserId);
        return ApiResponse.of(SuccessStatus.POST_DELETE_SUCCESS, null);
    }

    private Long getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userDetails.getUserId();
    }
}

