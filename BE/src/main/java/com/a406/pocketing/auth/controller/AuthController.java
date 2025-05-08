package com.a406.pocketing.auth.controller;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.auth.service.AuthService;
import com.a406.pocketing.auth.service.KakaoOAuthService;
import com.a406.pocketing.auth.service.TwitterOAuthService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NICKNAME_DUPLICATE;
import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.CHECK_NICKNAME_SUCCESS;
import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.SIGNUP_SUCCESS;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final KakaoOAuthService kakaoOAuthService;
    private final TwitterOAuthService twitterOAuthService;
    private final AuthService authService;

    /**
     * 카카오로부터 인가 코드를 전달 받아 회원가입/로그인 로직 수행
     * @param authorizationCode
     * @return
     */
    @GetMapping("/kakao/callback")
    public RedirectView kakaoCallback(@RequestParam("code") String authorizationCode) {
        String accessToken = kakaoOAuthService.getAccessToken(authorizationCode); // 1. 카카오에서 Access Token 발급
        OAuthUserResponseDto oAuthUserResponseDto = kakaoOAuthService.getUserInfo(accessToken); // 2. Access Token으로 사용자 정보 요청
        LoginResponseDto loginResponseDto = authService.authenticateOAuthUser(oAuthUserResponseDto); // 3. 회원 확인

        String redirectUrl = String.format(
                "https://k12a406.p.ssafy.io/twitter/callback?oauthProvider=%s&providerId=$s",
                URLEncoder.encode(loginResponseDto.getOauthProvider(), StandardCharsets.UTF_8),
                URLEncoder.encode(loginResponseDto.getProviderId(), StandardCharsets.UTF_8)
        );

        return new RedirectView(redirectUrl);
//        return ApiResponse.onSuccess(loginResponseDto);
    }

    /**
     * 트위터로부터 인가 코드를 전달 받아 회원가입/로그인 로직 수행
     * @param authorizationCode
     * @return
     */
    @GetMapping("/twitter/callback")
    public RedirectView twitterCallback(@RequestParam("code") String authorizationCode) {
        String accessToken = twitterOAuthService.getAccessToken(authorizationCode);
        OAuthUserResponseDto oAuthUserResponseDto = twitterOAuthService.getUserInfo(accessToken);
        LoginResponseDto loginResponseDto = authService.authenticateOAuthUser(oAuthUserResponseDto);

        String redirectUrl = String.format(
                "https://k12a406.p.ssafy.io/twitter/callback?oauthProvider=%s&providerId=%s",
                URLEncoder.encode(loginResponseDto.getOauthProvider(), StandardCharsets.UTF_8),
                URLEncoder.encode(loginResponseDto.getProviderId(), StandardCharsets.UTF_8)
        );

        return new RedirectView(redirectUrl);
    }

    /**
     * 닉네임 중복 확인
     * @param nickname
     * @return
     */
    @GetMapping("/check/nickname")
    public ApiResponse<?> checkNickname(@RequestParam("nickname") String nickname) {
        if(!authService.checkNickname(nickname)) {
            return ApiResponse.onFailure(USER_NICKNAME_DUPLICATE.getCode(), USER_NICKNAME_DUPLICATE.getMessage(), null);
        }
        return ApiResponse.of(CHECK_NICKNAME_SUCCESS, null);
    }

    /**
     * 회원가입
     * @param signupRequestDto
     * @return
     */
    @PostMapping("/signup")
    public ApiResponse<?> signup(@RequestBody SignupRequestDto signupRequestDto) {
        LoginResponseDto loginResponseDto = authService.signup(signupRequestDto);
        return ApiResponse.of(SIGNUP_SUCCESS, loginResponseDto);
    }

}
