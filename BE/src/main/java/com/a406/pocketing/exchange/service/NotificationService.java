package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.NotificationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {

    Page<NotificationResponseDto> getAllNotifications(Long userId, Pageable pageable);
}
