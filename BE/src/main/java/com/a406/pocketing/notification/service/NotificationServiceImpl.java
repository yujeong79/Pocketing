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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    /**
     * FCM 등록 API
     * @param userId
     * @param requestDto
     */
    @Override
    @Transactional
    public void registerFcmToken(Long userId, FcmTokenRequestDto requestDto) {
        String token = requestDto.getFcmToken();

        if (token == null || token.isBlank()) {
            throw new GeneralException(NOTIFICATION_TOKEN_NOT_FOUND);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        try {
            fcmTokenRepository.findByToken(token).ifPresentOrElse(existingToken -> {
                //토큰이 이미 존재할 때
                if (!existingToken.getUser().getUserId().equals(userId)) {
                    existingToken.setUser(user);
                }
                existingToken.setIsActive(true);
                existingToken.updateTimestamp();
                fcmTokenRepository.save(existingToken);
            }, () -> {
                // 토큰이 없을 때
                FcmToken newToken = FcmToken.builder()
                        .user(user)
                        .token(token)
                        .isActive(true)
                        .build();
                fcmTokenRepository.save(newToken);
            });
        } catch (DataIntegrityViolationException e) {
            log.warn("FCM 중복 토큰 처리됨: {}", token);
        }
    }

    @Override
    @Transactional
    public void sendFcmToUser(Long userId, String title, String body) {
        log.info("FCM 토큰 조회 시도 - userId: {}", userId);
        List<String> tokens = fcmTokenRepository.findActiveTokensByUserId(userId);
        log.info("조회된 FCM 토큰 개수: {}", tokens.size());

        for (String token : tokens) {
            log.info("전송 시도: token={}", token);

            Message message = Message.builder()
                    .setToken(token)
                    .putData("title", title)
                    .putData("body", body)
                    .putData("type", "EXCHANGE")
                    .build();

            try {
                firebaseMessaging.send(message);
                log.info("FCM 전송 성공: token={}", token);
            } catch (FirebaseMessagingException e) {
                log.error("FCM 전송 실패 (token: {}): {}",  token, e.getMessage());
                if (e.getErrorCode().equals("registration-token-not-registered") ||
                    e.getErrorCode().equals("Requested entity was not found")) {
                    fcmTokenRepository.deactivateToken(token);

                    if ("registration-token-not-registered".equals(e.getErrorCode()) ||
                            (e.getMessage().contains("Requested entity was not found."))) {
                        fcmTokenRepository.deactivateToken(token);
                        log.info("비활성화 처리 완료: {}", token);
                    }
                }
            }
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

    @Override
    @Transactional
    public void sendChatMessageNotification(Long receiverId, String senderNickname, String messageContent, Long roomId) {
        log.info("채팅 FCM 전송 시도 - receiverId: {}, roomId: {}", receiverId, roomId);

        List<String> tokens = fcmTokenRepository.findActiveTokensByUserId(receiverId);

        String title = "새로운 메시지 도착";
        String body = senderNickname + ":" + (messageContent.length() > 50 ? messageContent.substring(0, 47) + "..." : messageContent);

        for (String token : tokens) {
            Message message = Message.builder()
                    .setToken(token)
                    .putData("title", title)
                    .putData("body", body)
                    .putData("type", "CHAT")
                    .putData("roomId", roomId.toString())
                    .build();

            try {
                firebaseMessaging.send(message);
            } catch (FirebaseMessagingException e) {
                log.error("FCM 전송 실패 (token: {}): {}", token, e.getMessage());

                if ("registration-token-not-registered".equals(e.getErrorCode()) ||
                        (e.getMessage().contains("Requested entity was not found."))) {
                    fcmTokenRepository.deactivateToken(token);
                    log.info("비활성화 처리 완료: {}", token);
                }
            }
        }
    }
}
