package com.a406.pocketing.auth.controller;

import com.a406.pocketing.auth.dto.OAuthUserResponseDto;
import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.auth.service.AuthService;
import com.a406.pocketing.auth.service.KakaoOAuthService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.SIGNUP_SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final KakaoOAuthService kakaoOAuthService;
    private final AuthService authService;

    /**
     * 카카오로부터 인가 코드를 전달 받으면 회원가입 혹은 로그인 로직 수행
     * @param authorizationCode
     * @return
     */
    @GetMapping("/kakao/callback")
    public ApiResponse<?> kakaoCallback(@RequestParam("code") String authorizationCode) {
        String accessToken = kakaoOAuthService.getAccessToken(authorizationCode); // 1. 카카오에서 Access Token 발급
        OAuthUserResponseDto oAuthUserResponseDto = kakaoOAuthService.getUserInfo(accessToken); // 2. Access Token으로 사용자 정보 요청
        LoginResponseDto loginResponseDto = authService.authenticateOAuthUser(oAuthUserResponseDto); // 3. 회원 확인

        return ApiResponse.onSuccess(loginResponseDto);
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
