package com.a406.pocketing.exchange.entity;

import com.a406.pocketing.exchange.enums.ExchangeRequestStatus;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exchange_request",
    indexes = {
        @Index(name = "idx_requester", columnList = "requester_id"),
        @Index(name = "idx_responder", columnList = "responder_id"),
        @Index(name = "idx_status", columnList = "status"),
        @Index(name = "idx_requester_responder", columnList = "requester_id, responder_id")
    })
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_request_id")
    private Long exchangeRequestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responder_id", nullable = false)
    private User responder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_owned_id", nullable = false)
    private ExchangeCard requesterOwnedCard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responder_owned_id", nullable = false)
    private ExchangeCard responderOwnedCard;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private ExchangeRequestStatus status = ExchangeRequestStatus.PENDING;

    public void updateStatus(ExchangeRequestStatus status) {
        this.status = status;
    }
}
