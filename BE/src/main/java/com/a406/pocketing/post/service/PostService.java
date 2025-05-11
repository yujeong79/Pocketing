package com.a406.pocketing.post.service;

import com.a406.pocketing.post.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface PostService {
    List<PostRegisterResponseDto> registerPost(Long userId, List<PostRegisterRequestDto> requestDtos);

    Page<PostResponseDto> getPosts(Long memberId, Long albumId, Pageable pageable);

    SellerListResponseDto getSellersByCardId(Long cardId, Pageable pageable);

    PostDetailResponseDto getPostDetail(Long postId, Long currentUserId);

    void updatePost(Long postId, Long userId, PostUpdateRequestDto requestDto);

    void deletePost(Long postId, Long userId);

    void updatePostStatus(Long userId, PostUpdateStatusRequestDto postUpdateStatusRequestDto);

    CheapestPostDto getCheapestPostByCardId(Long cardId);

    Map<Long, CheapestPostDto> getCheapestPostsByCardIds(List<Long> cardIds);

    List<PostListItemResponseDto> getMyAvailablePosts(Long userId);

    List<PostListItemResponseDto> getMyCompletedPosts(Long userId);
}

