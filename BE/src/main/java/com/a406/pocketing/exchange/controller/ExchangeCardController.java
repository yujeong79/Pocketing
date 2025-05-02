package com.a406.pocketing.exchange.controller;

import com.a406.pocketing.auth.jwt.JwtProvider;
import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResponseDto;
import com.a406.pocketing.exchange.service.ExchangeCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange/card")
public class ExchangeCardController {

    private final ExchangeCardService exchangeCardService;
    private final JwtProvider jwtProvider;

    /**
     * 현장 교환 카드 등록 API
     * @param userDetails
     * @param requestDto
     * @return 성공 메시지, responseDto
     */
    @PostMapping("/register")
    public ApiResponse<?> registerExchangeCard(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody ExchangeCardRequestDto requestDto
            ) {
        Long userId = userDetails.getUserId();
        ExchangeCardResponseDto responseDto = exchangeCardService.registerExchangeCard(userId, requestDto);

        return ApiResponse.of(SuccessStatus.EXCHANGE_CARD_REGISTER_SUCCESS, responseDto);
    }

    /**
     * 현장 교환 목록 조회 API
     * @param userDetails
     * @param range
     * @return
     */
    @GetMapping("/list")
    public ApiResponse<?> getNearbyExchangeList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam int range
    ) {
        Long userId = userDetails.getUserId();
        List<NearbyExchangeCardResponseDto> responseDto = exchangeCardService.getNearbyExchangeList(userId, range);

        return ApiResponse.of(SuccessStatus.EXCHANGE_AVAILABLE_USERS_FOUND_SUCCESS, responseDto);
    }
}
