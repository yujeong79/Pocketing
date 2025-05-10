package com.a406.pocketing.notification.service;

import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.notification.dto.FcmTokenRequestDto;
import com.a406.pocketing.notification.dto.NotificationResponseDto;
import com.a406.pocketing.notification.entity.FcmToken;
import com.a406.pocketing.notification.enums.NotificationType;
import com.a406.pocketing.notification.repository.FcmTokenRepository;
import com.a406.pocketing.notification.repository.NotificationRepository;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.NOTIFICATION_TOKEN_NOT_FOUND;
import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;


@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final FcmTokenRepository fcmTokenRepository;
    private final FirebaseMessaging firebaseMessaging;

    /**
     * 알림 목록 조회 API
     * @param userId
     * @param pageable
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findAllProjectionsByUserRelated(
                userId,
                pageable)
                .map(p -> NotificationResponseDto.builder()
                        .notificationId(p.getNotificationId())
                        .exchangeRequest(NotificationResponseDto.ExchangeRequestDto.builder()
                                .exchangeRequestId(p.getExchangeRequestId())
                                .build())
                        .notificationType(p.getNotificationType())
                        .isRead(p.getIsRead())
                        .user(NotificationResponseDto.UserDto.builder()
                                .userId(p.getUserId())
                                .nickname(p.getNickname())
                                .profileImageUrl(p.getProfileImageUrl())
                                .build())
                        .build());
    }

    @Override
    public void registerFcmToken(Long userId, FcmTokenRequestDto requestDto) {
        String token = requestDto.getFcmToken();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));

        Boolean exists = fcmTokenRepository.existsByUserAndToken(user, token);
        if(!exists) {
            FcmToken fcmToken = FcmToken.builder()
                    .user(user)
                    .token(token)
                    .isActive(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            fcmTokenRepository.save(fcmToken);
        }
    }

    @Override
    public void sendFcmToUser(Long userId, String title, String body) {
        log.info("FCM 토큰 조회 시도 - userId: {}", userId);

        String token = fcmTokenRepository.findFirstActiveTokenByUserId(userId)
                .map(FcmToken::getToken)
                .orElseThrow(() -> new GeneralException(NOTIFICATION_TOKEN_NOT_FOUND));

        // fcm 메시지 생성
        Message message = Message.builder()
                .setToken(token)
                .setNotification(com.google.firebase.messaging.Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        //fcm 전송
        try {
            firebaseMessaging.send(message);
            log.info("FCM 전송 성공: {}", firebaseMessaging.send(message));
        } catch (FirebaseMessagingException e) {
            log.error("FCM 전송 실패 (UserId={}): {}", userId, e.getMessage());
        }
    }

    @Override
    public void createNotification(User requester, User responder, ExchangeRequest request, NotificationType type) {
        com.a406.pocketing.notification.entity.Notification notification = com.a406.pocketing.notification.entity.Notification.builder()
                        .requester(requester)
                                .responder(responder)
                                        .exchangeRequest(request)
                                                .isRead(false)
                                                        .notificationType(type)
                                                                .build();
        notificationRepository.save(notification);
    }
}
