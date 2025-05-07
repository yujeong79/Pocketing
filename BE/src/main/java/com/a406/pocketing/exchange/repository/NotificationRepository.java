package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.dto.NotificationProjection;
import com.a406.pocketing.exchange.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("""
        SELECT 
            n.notificationId AS notificationId,
            er.exchangeRequestId AS exchangeRequestId,
            n.notificationType AS notificationType,
            n.isRead AS isRead,
            CASE 
                WHEN n.notificationType = 'RECEIVED' THEN requester.userId
                ELSE responder.userId
            END AS userId,
            CASE 
                WHEN n.notificationType = 'RECEIVED' THEN requester.nickname
                ELSE responder.nickname
            END AS nickname,
            CASE 
                WHEN n.notificationType = 'RECEIVED' THEN requester.profileImageUrl
                ELSE responder.profileImageUrl
            END AS profileImageUrl
        FROM Notification n
        JOIN n.requester requester
        JOIN n.responder responder
        JOIN n.exchangeRequest er
        WHERE
            (n.notificationType = 'RECEIVED' AND n.responder.userId = :userId)
            OR 
            (n.notificationType IN ('ACCEPTED', 'REJECTED') AND n.requester.userId = :userId)
        ORDER BY n.notificationId DESC 
    """)
    Page<NotificationProjection> findAllProjectionsByUserRelated(Long userId, Pageable pageable);
}
