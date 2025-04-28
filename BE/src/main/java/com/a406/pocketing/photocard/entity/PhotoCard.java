package com.a406.pocketing.photocard.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
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
