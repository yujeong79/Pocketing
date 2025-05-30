package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;

public interface AuthService {

    LoginResponseDto authenticateOAuthUser(OAuthUserResponseDto oauthUserDto);
    boolean checkNickname(String nickname);
    LoginResponseDto signup(SignupRequestDto signupRequestDto);

}
