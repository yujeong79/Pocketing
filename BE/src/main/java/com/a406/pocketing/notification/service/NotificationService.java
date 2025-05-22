package com.a406.pocketing.notification.service;

import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.notification.dto.FcmTokenRequestDto;
import com.a406.pocketing.notification.dto.NotificationResponseDto;
import com.a406.pocketing.notification.enums.NotificationType;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable);

    void registerFcmToken(Long userId, FcmTokenRequestDto requestDto);

    void sendFcmToUser(Long userId, String title, String body);

    void createNotification(User requester, User responder, ExchangeRequest request, NotificationType type);

    void sendChatMessageNotification(Long receiverId, String senderNickname, String messageContent, Long roomId);

    void isReadNotification(Long userId);
}
