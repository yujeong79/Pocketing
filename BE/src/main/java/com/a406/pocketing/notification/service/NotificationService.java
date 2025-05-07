package com.a406.pocketing.notification.service;

import com.a406.pocketing.notification.dto.FcmTokenRequestDto;
import com.a406.pocketing.notification.dto.NotificationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable);
    void registerFcmToken(Long userId, FcmTokenRequestDto requestDto);
}
