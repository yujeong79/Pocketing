package com.a406.pocketing.auth.principal;

import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.user.dto.UserResponseDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetails loadUserByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        return new CustomUserDetails(UserResponseDto.of(user));
    }
}
