package com.a406.pocketing.notification.entity;

import com.a406.pocketing.notification.enums.NotificationType;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notification", indexes = {
        @Index(name = "idx_notification_responder", columnList = "responder_id"),
        @Index(name = "idx_notification_is_read", columnList = "is_read")
})
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responder_id", nullable = false)
    private User responder;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exchange_request_id", nullable = false)
    private ExchangeRequest exchangeRequest;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    @Builder.Default
    private NotificationType notificationType = NotificationType.RECEIVED;

    public void updateStatus(NotificationType notificationType) {
        this.notificationType = notificationType;
    }

}
