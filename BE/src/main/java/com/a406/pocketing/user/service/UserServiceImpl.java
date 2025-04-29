package com.a406.pocketing.user.service;

import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.user.dto.UserResponseDto;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponseDto findById(Long userId) {
        return userRepository.findById(userId)
                .map(UserResponseDto::of)
                .orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
    }

}
