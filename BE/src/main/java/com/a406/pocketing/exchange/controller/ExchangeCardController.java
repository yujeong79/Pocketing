package com.a406.pocketing.exchange.controller;

import com.a406.pocketing.auth.jwt.JwtProvider;
import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.service.ExchangeCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange")
public class ExchangeCardController {

    private final ExchangeCardService exchangeCardService;
    private final JwtProvider jwtProvider;

    @PostMapping("card/register")
    public ApiResponse<?> registerExchangeCard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody ExchangeCardRequestDto requestDto
            ) {
        Long userId = userDetails.getId();
        ExchangeCardResponseDto responseDto = exchangeCardService.registerExgit changeCard(userId, requestDto);

        return ApiResponse.onSuccess(responseDto);
    }
}
