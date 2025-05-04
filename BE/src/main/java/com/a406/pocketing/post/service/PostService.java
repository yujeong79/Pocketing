package com.a406.pocketing.post.service;

import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;
import com.a406.pocketing.post.dto.PostResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    List<PostRegisterResponseDto> registerPost(Long userId, List<PostRegisterRequestDto> requestDtos);

    Page<PostResponseDto> getPosts(Long memberId, Long albumId, Pageable pageable);

}

