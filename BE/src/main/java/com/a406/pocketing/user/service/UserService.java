package com.a406.pocketing.user.service;

import com.a406.pocketing.user.dto.UserResponseDto;

public interface UserService {

    UserResponseDto findById(Long userId);

}
