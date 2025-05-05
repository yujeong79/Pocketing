package com.a406.pocketing.exchange.dto;

public interface NotificationProjection {
    Long getNotificationId();
    Long getExchangeRequestId();
    String getNotificationType();
    Boolean getIsRead();

    // 알림에서 보여줄 사용자 정보 (타입에 따라 requester 또는 responder)
    Long getUserId();
    String getNickname();
    String getProfileImageUrl();
}
