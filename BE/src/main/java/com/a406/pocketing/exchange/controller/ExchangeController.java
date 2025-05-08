package com.a406.pocketing.exchange.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.exchange.dto.ExchangeRequestDto;
import com.a406.pocketing.exchange.service.ExchangeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange")
public class ExchangeController {

    private final ExchangeService exchangeService;

    @PostMapping("/request")
    public ApiResponse<?> sendExchangeRequest(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody ExchangeRequestDto requestDto
            ) {
        Long userId = userDetails.getUserId();
        exchangeService.sendExchangeRequest(userId, requestDto);
        return ApiResponse.of(SuccessStatus.EXCHANGE_REQUEST_REGISTER_SUCCESS, null);
    }
}
