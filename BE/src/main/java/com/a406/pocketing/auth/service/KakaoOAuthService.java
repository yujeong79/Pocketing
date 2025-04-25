package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;

public interface KakaoOAuthService {

    String getAccessToken(String authorizationCode);
    OAuthUserResponseDto getUserInfo(String accessToken);

}
