package com.a406.pocketing.photocard.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "photo_card_statistics")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PhotoCardStatistics {

    @Id
    private Long cardId;  // PK이자 FK

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // cardId를 photocards.card_id에 매핑
    @JoinColumn(name = "card_id")
    private PhotoCard photoCard;

    @Column(nullable = false)
    private int postCount;

    @Column(nullable = false)
    private long totalPrice;

    @Column(nullable = false)
    private int avgPrice;

    @Column(nullable = true)
    private Integer minPrice;

    @Column(nullable = true)
    private Integer maxPrice;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    @Version
    private Integer version;

}
