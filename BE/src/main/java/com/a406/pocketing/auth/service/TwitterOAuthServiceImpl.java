package com.a406.pocketing.auth.service;

import com.a406.pocketing.auth.config.OAuthProperties;
import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.callback.TwitterTokenResponse;
import com.a406.pocketing.auth.dto.callback.TwitterUserResponse;
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
public class TwitterOAuthServiceImpl implements TwitterOAuthService{

    private final RestTemplate restTemplate;
    private final OAuthProperties oauthProperties;

    @Override
    public String getAccessToken(String authorizationCode) {
        String clientId = oauthProperties.getRegistration().getTwitter().getClientId();
        String authorizationGrantType = oauthProperties.getRegistration().getTwitter().getAuthorizationGrantType();
        String redirectUri = oauthProperties.getRegistration().getTwitter().getRedirectUri();
        String tokenUri = oauthProperties.getProvider().getTwitter().getTokenUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("grant_type", authorizationGrantType);
        params.add("code", authorizationCode);
        params.add("redirect_uri", redirectUri);
        params.add("code_verifier", "challenge");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<TwitterTokenResponse> response = restTemplate.postForEntity(
                tokenUri,
                request,
                TwitterTokenResponse.class
        );

        return response.getBody().getAccessToken();
    }

    @Override
    public OAuthUserResponseDto getUserInfo(String accessToken) {
        String userInfoUri = oauthProperties.getProvider().getTwitter().getUserInfoUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<TwitterUserResponse> response = restTemplate.exchange(
                userInfoUri,
                HttpMethod.GET,
                request,
                TwitterUserResponse.class
        );

        TwitterUserResponse twitterUser = response.getBody();

        return OAuthUserResponseDto.builder()
                .oauthProvider("twitter")
                .providerId(twitterUser.getData().getId())
                .build();
    }

}
