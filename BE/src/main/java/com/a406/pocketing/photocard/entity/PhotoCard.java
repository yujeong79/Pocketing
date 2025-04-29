package com.a406.pocketing.photocard.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Slf4j
@Table(
        name = "photocards",
        indexes = {
                @Index(name = "idx_photocards_album_id", columnList = "album_id"),
                @Index(name = "idx_photocards_member_id", columnList = "member_id")
        }
)
public class PhotoCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false)
    private Long albumId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String cardImageUrl;
}
