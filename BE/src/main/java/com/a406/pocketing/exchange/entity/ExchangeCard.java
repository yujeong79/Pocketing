package com.a406.pocketing.exchange.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "exchange_card")
@Slf4j
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExchangeCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_card_id")
    private Long exchangeCardId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "album_id", nullable = false)
    private Long albumId;

    @Column(name = "is_owned", nullable = false)
    private Boolean isOwned;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "exchange_image_url", columnDefinition = "TEXT")
    private String exchangeImageUrl;
}
