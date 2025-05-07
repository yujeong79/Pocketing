package com.a406.pocketing.exchange.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.exchange.dto.NotificationResponseDto;
import com.a406.pocketing.exchange.entity.Notification;
import com.a406.pocketing.exchange.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exchange/notification")
public class NotificationController {

    private final NotificationService notificationService;

    /**
     * 알림 목록 조회
     * @param userDetails
     * @param pageable
     * @return
     */
    @GetMapping("/list")
    public ApiResponse<Page<NotificationResponseDto>> getNotifications(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            Pageable pageable
            ) {
        Long userId = userDetails.getUserId();
        log.info("알림 요청 userId: {}", userId);
        Page<NotificationResponseDto> page = notificationService.getAllNotifications(userId, pageable);
        return ApiResponse.of(SuccessStatus.EXCHANGE_RECEIVED_REQUESTS_SUCCESS, page);
    }
}
