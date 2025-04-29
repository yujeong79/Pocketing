package com.a406.pocketing.auth.dto;

import com.a406.pocketing.auth.jwt.JwtTokenDto;
import com.a406.pocketing.user.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
public class LoginResponseDto {
    Boolean isRegistered;

    String oauthProvider;
    String providerId;

    String nickname;
    String profileImageUrl;
    String accessToken;

    public static LoginResponseDto ofExistingUser(User user, JwtTokenDto jwtTokenDto) {
        return LoginResponseDto.builder()
                .isRegistered(true)
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .accessToken(jwtTokenDto.getAccessToken())
                .build();
    }

    public static LoginResponseDto ofNewUser(String oauthProvider, String providerId) {
        return LoginResponseDto.builder()
                .isRegistered(false)
                .oauthProvider(oauthProvider)
                .providerId(providerId)
                .build();
    }

}
