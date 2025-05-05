package com.a406.pocketing.post.service;

import com.a406.pocketing.post.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    List<PostRegisterResponseDto> registerPost(Long userId, List<PostRegisterRequestDto> requestDtos);

    Page<PostResponseDto> getPosts(Long memberId, Long albumId, Pageable pageable);

    SellerListResponseDto getSellersByCardId(Long cardId, Pageable pageable);

    PostDetailResponseDto getPostDetail(Long postId, Long currentUserId);

    void updatePost(Long postId, Long userId, PostUpdateRequestDto requestDto);

    void deletePost(Long postId, Long userId);

}

