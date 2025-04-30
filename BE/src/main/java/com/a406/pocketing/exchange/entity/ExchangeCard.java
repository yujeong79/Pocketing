package com.a406.pocketing.exchange.entity;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "exchange_card",
    indexes = {
        @Index(name = "idx_exchange_card_user_is_owned_status", columnList = "user_id, is_owned, status"),
        @Index(name = "idx_exchange_card_album_member_is_owned_status", columnList = "album_id, member_id, is_owned, status")
    })
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    @Column(name = "is_owned", nullable = false)
    private Boolean isOwned;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "exchange_image_url", columnDefinition = "TEXT")
    private String exchangeImageUrl;

    @Column(name = "status", nullable = false)
    private String status = "ACTIVE";


    // ExchangeCard.java
    public void updateCardInfo(Group group, Album album, Member member, String description, String exchangeImageUrl) {
        this.group = group;
        this.album = album;
        this.member = member;
        this.description = description;
        this.exchangeImageUrl = exchangeImageUrl;
    }

}

