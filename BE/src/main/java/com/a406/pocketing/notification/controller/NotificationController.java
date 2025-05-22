package com.a406.pocketing.notification.controller;

import com.a406.pocketing.notification.dto.FcmTokenRequestDto;
import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import com.a406.pocketing.notification.dto.NotificationResponseDto;
import com.a406.pocketing.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
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

    /**
     * fcm 토큰 등록
     * @param userDetails
     * @param requestDto
     * @return
     */
    @PostMapping("/fcm-token")
    public ApiResponse<?> registerFcmToken(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody FcmTokenRequestDto requestDto
            ) {
        Long userId = userDetails.getUserId();
        notificationService.registerFcmToken(userId, requestDto);
        return ApiResponse.of(SuccessStatus.NOTIFICATION_TOKEN_REGISTER_SUCCESS, null);
    }

    /**
     * 알림 읽음 처리
     */
    @PostMapping("/read")
    public ApiResponse<?> isReadNotification(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getUserId();
        notificationService.isReadNotification(userId);
        return ApiResponse.of(SuccessStatus.EXCHANGE_NOTIFICATION_READ_SUCCESS, null);
    }
}
