package com.a406.pocketing.post.service;

import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;

import java.util.List;

public interface PostService {
    List<PostRegisterResponseDto> registerPost(Long userId, List<PostRegisterRequestDto> requestDtos);

}

