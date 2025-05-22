package com.a406.pocketing.notification.repository;

import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.notification.dto.NotificationProjection;
import com.a406.pocketing.notification.entity.Notification;
import com.a406.pocketing.notification.enums.NotificationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Boolean existsByExchangeRequestAndNotificationType(ExchangeRequest exchangeRequest, NotificationType type);

    Optional<Notification> findByExchangeRequestAndNotificationType(ExchangeRequest exchangeRequest, NotificationType type);

    @Query("""
        SELECT 
            n.notificationId AS notificationId,
            er.exchangeRequestId AS exchangeRequestId,
            n.notificationType AS notificationType,
            n.isRead AS isRead,
            CASE
                WHEN n.notificationType = 'RECEIVED' THEN requester.userId
                WHEN n.notificationType = 'ACCEPTED_ACTIVE' THEN requester.userId
                WHEN n.notificationType = 'ACCEPTED_PASSIVE' THEN requester.userId
                WHEN n.notificationType = 'REJECTED' THEN requester.userId
            END AS userId,
            CASE
                WHEN n.notificationType = 'RECEIVED' THEN requester.nickname
                WHEN n.notificationType = 'ACCEPTED_ACTIVE' THEN requester.nickname
                WHEN n.notificationType = 'ACCEPTED_PASSIVE' THEN requester.nickname
                WHEN n.notificationType = 'REJECTED' THEN requester.nickname
            END AS nickname,
            CASE
                WHEN n.notificationType = 'RECEIVED' THEN requester.profileImageUrl
                WHEN n.notificationType = 'ACCEPTED_ACTIVE' THEN requester.profileImageUrl
                WHEN n.notificationType = 'ACCEPTED_PASSIVE' THEN requester.profileImageUrl
                WHEN n.notificationType = 'REJECTED' THEN requester.profileImageUrl
            END AS profileImageUrl
        FROM Notification n
        JOIN n.requester requester
        JOIN n.responder responder
        JOIN n.exchangeRequest er
        WHERE
            n.notificationType IN ('RECEIVED', 'ACCEPTED_ACTIVE', 'ACCEPTED_PASSIVE', 'REJECTED')
            AND n.responder.userId = :userId
        ORDER BY n.notificationId DESC 
    """)
    Page<NotificationProjection> findAllProjectionsByUserRelated(
            @Param("userId") Long userId,
            Pageable pageable
    );

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
        UPDATE Notification  n
            SET n.isRead = true
        WHERE n.responder.userId = :userId
            AND n.isRead = false
    """)
    int markAllAsRead(@Param("userId") Long userId);
}
