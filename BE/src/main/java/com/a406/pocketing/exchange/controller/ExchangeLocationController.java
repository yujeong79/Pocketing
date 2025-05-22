package com.a406.pocketing.exchange.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.exchange.dto.ExchangeLocationRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeLocationResponseDto;
import com.a406.pocketing.exchange.service.ExchangeLocationService;
import com.sun.net.httpserver.Authenticator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange")
public class ExchangeLocationController {

    private final ExchangeLocationService exchangeLocationService;

    /**
     * 위치 범위 설정 API
     * @param userDetails
     * @param requestDto
     * @return 성공 메시지, responseDto
     */
    @PostMapping("/location")
    public ApiResponse<?> registerLocation (
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody ExchangeLocationRequestDto requestDto
            ) {
        Long userId = userDetails.getUserId();
        ExchangeLocationResponseDto responseDto = exchangeLocationService.registerLocation(userId, requestDto);
        return ApiResponse.of(SuccessStatus.EXCHANGE_LOCATION_SAVE_SUCCESS, responseDto);
    }
}
