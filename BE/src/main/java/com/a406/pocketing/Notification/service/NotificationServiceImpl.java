package com.a406.pocketing.Notification.service;

import com.a406.pocketing.Notification.dto.NotificationResponseDto;
import com.a406.pocketing.Notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    /**
     * 알림 목록 조회 API
     * @param userId
     * @param pageable
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findAllProjectionsByUserRelated(userId, pageable)
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
}
