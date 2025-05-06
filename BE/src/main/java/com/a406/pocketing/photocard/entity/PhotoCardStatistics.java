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

    private int postCount;

    private long totalPrice;

    private int avgPrice;

    private int minPrice;

    private int maxPrice;

    private LocalDateTime lastUpdated;

    @Version
    private Integer version;


    // 시세 갱신 메서드
    public void updateWithNewPrice(int newPrice) {
        this.totalPrice += newPrice;
        this.postCount += 1;
        this.avgPrice = (int) (this.totalPrice / this.postCount);
        this.minPrice = (this.postCount == 1) ? newPrice : Math.min(this.minPrice, newPrice);
        this.maxPrice = (this.postCount == 1) ? newPrice : Math.max(this.maxPrice, newPrice);
        this.lastUpdated = LocalDateTime.now();
    }
}
