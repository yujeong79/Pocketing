package com.a406.pocketing.Notification.service;

import com.a406.pocketing.Notification.dto.NotificationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable);
}
