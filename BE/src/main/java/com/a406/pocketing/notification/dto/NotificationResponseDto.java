package com.a406.pocketing.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDto {

    private Long notificationId;
    private String notificationType;
    private boolean isRead;
    private ExchangeRequestDto exchangeRequest;
    private UserDto user;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDto {
        private Long userId;
        private String nickname;
        private String profileImageUrl;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExchangeRequestDto {
        private Long exchangeRequestId;
    }
}
