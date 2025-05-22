package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.config.OAuthProperties;
import com.a406.pocketing.auth.dto.callback.KakaoTokenResponse;
import com.a406.pocketing.auth.dto.callback.KakaoUserResponse;
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
    private final OAuthProperties oauthProperties;

    @Override
    public String getAccessToken(String authorizationCode) {
        String authorizationGrantType = oauthProperties.getRegistration().getKakao().getAuthorizationGrantType();
        String clientId = oauthProperties.getRegistration().getKakao().getClientId();
        String redirectUri = oauthProperties.getRegistration().getKakao().getRedirectUri();
        String tokenUri = oauthProperties.getProvider().getKakao().getTokenUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", authorizationGrantType);
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", authorizationCode);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<KakaoTokenResponse> response = restTemplate.postForEntity(
                tokenUri,
                request,
                KakaoTokenResponse.class
        );

        return response.getBody().getAccessToken();
    }

    @Override
    public OAuthUserResponseDto getUserInfo(String accessToken) {
        String userInfoUri = oauthProperties.getProvider().getKakao().getUserInfoUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<KakaoUserResponse> response = restTemplate.exchange(
            userInfoUri,
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
