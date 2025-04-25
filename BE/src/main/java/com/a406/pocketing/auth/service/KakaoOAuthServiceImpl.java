package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.config.KakaoOAuthProperties;
import com.a406.pocketing.auth.dto.KakaoTokenResponse;
import com.a406.pocketing.auth.dto.KakaoUserResponse;
import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoOAuthServiceImpl implements KakaoOAuthService{

    private final RestTemplate restTemplate;
    private final KakaoOAuthProperties kakaoOAuthProperties;

    @Override
    public String getAccessToken(String authorizationCode) {
        String clientId = kakaoOAuthProperties.getClientId();
        String redirectUri = kakaoOAuthProperties.getRedirectUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<KakaoTokenResponse> response = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token",
                request,
                KakaoTokenResponse.class
        );
        
        log.info("🔑 Kakao에게 accessToken 요청 및 응답" + response.getBody().getAccessToken());

        return response.getBody().getAccessToken();
    }

    @Override
    public OAuthUserResponseDto getUserInfo(String accessToken) {
        log.info("🔑 accessToken = {}", accessToken);
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<KakaoUserResponse> response = restTemplate.exchange(
            "https://kapi.kakao.com/v2/user/me",
            HttpMethod.GET,
            request,
            KakaoUserResponse.class
        );

        KakaoUserResponse kakaoUser = response.getBody();

        return OAuthUserResponseDto.builder()
                .oauthProvider("kakao")
                .providerId(kakaoUser.getId())
                .build();
    }

}
