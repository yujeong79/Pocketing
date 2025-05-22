package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.auth.jwt.JwtProvider;
import com.a406.pocketing.auth.jwt.JwtTokenDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public LoginResponseDto authenticateOAuthUser(OAuthUserResponseDto oauthUserDto) {
        Optional<User> userOpt = userRepository.findByOauthProviderAndProviderId(oauthUserDto.getOauthProvider(), oauthUserDto.getProviderId());

        if (userOpt.isPresent()) {
            JwtTokenDto jwtTokenDto = jwtProvider.generateToken(userOpt.get().getId());
            return LoginResponseDto.ofExistingUser(userOpt.get(), jwtTokenDto);
        } else {
            return LoginResponseDto.ofNewUser(oauthUserDto.getOauthProvider(), oauthUserDto.getProviderId());
        }
    }

    @Override
    public LoginResponseDto signup(SignupRequestDto signupRequestDto) {
        User user = User.builder()
                .oauthProvider(signupRequestDto.getOauthProvider())
                .providerId(signupRequestDto.getProviderId())
                .nickname(signupRequestDto.getNickname())
                .profileImageUrl(signupRequestDto.getProfileImageUrl())
                .build();

        userRepository.save(user);

        JwtTokenDto jwtTokenDto = jwtProvider.generateToken(user.getId());
        return LoginResponseDto.ofExistingUser(user, jwtTokenDto);
    }

}
