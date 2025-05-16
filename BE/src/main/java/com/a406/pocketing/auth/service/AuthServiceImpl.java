package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.auth.jwt.JwtProvider;
import com.a406.pocketing.auth.jwt.JwtTokenDto;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import com.a406.pocketing.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NICKNAME_DUPLICATE;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public LoginResponseDto authenticateOAuthUser(OAuthUserResponseDto oauthUserDto) {
        Optional<User> userOpt = userRepository.findByOauthProviderAndProviderId(oauthUserDto.getOauthProvider(), oauthUserDto.getProviderId());

        if (userOpt.isPresent()) {
            LoginResponseDto loginResponseDto = LoginResponseDto.ofExistingUser(userOpt.get()); // 유저 ResponseDto
            JwtTokenDto jwtTokenDto = jwtProvider.generateToken(userOpt.get().getUserId()); // 토큰 발급
            loginResponseDto.setAccessToken(jwtTokenDto.getAccessToken()); // ResponseDto에 토큰 set
            return loginResponseDto;
        } else {
            return LoginResponseDto.ofNewUser(oauthUserDto.getOauthProvider(), oauthUserDto.getProviderId());
        }
    }

    @Override
    public boolean checkNickname(String nickname) {
        Optional<User> userOpt = userRepository.findByNickname(nickname);

        if(userOpt.isPresent()) {
            return false;
        }

        return true;
    }

    @Override
    public LoginResponseDto signup(SignupRequestDto signupRequestDto) {
        // 1. 유저 엔티티 저장
        LoginResponseDto loginResponseDto = userService.signup(signupRequestDto); // 유저 ResponseDto
        
        // 2. 관심 그룹 및 멤버 저장
        userService.registerLikedInfo(loginResponseDto.getUserId(), signupRequestDto.getLikedInfo());

        // 3. JWT 발급
        JwtTokenDto jwtTokenDto = jwtProvider.generateToken(loginResponseDto.getUserId());

        // 4. 응답 DTO에 JWT SET
        loginResponseDto.setAccessToken(jwtTokenDto.getAccessToken());

        return loginResponseDto;
    }

}
