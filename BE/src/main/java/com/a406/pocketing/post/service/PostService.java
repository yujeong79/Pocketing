package com.a406.pocketing.post.service;

import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;

public interface PostService {
    PostRegisterResponseDto registerPost(Long userId, PostRegisterRequestDto requestDto);
}

