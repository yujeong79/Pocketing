package com.a406.pocketing.post.entity;

import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "post",
        indexes = {
                @Index(name = "idx_post_seller", columnList = "seller_id"),
                @Index(name = "idx_post_buyer", columnList = "buyer_id"),
                @Index(name = "idx_post_card", columnList = "card_id")
        },
        uniqueConstraints = {
                // 예시: 하나의 카드로 한 번만 판매 가능하게 제한
                // @UniqueConstraint(name = "uk_post_card", columnNames = {"card_id"})
        }
)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false, foreignKey = @ForeignKey(name = "fk_post_seller_users"))
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", foreignKey = @ForeignKey(name = "fk_post_buyer_users"))
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false, foreignKey = @ForeignKey(name = "fk_post_photocard"))
    private PhotoCard photoCard;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String postImageUrl;

    @Column(nullable = false)
    private LocalDateTime createAt;

    @Column(nullable = false)
    private String status;

    @PrePersist
    public void prePersist() {
        this.createAt = this.createAt == null ? LocalDateTime.now() : this.createAt;
    }

    public void update(Integer price) {
        this.price = price;
    }

    public void updateStatus(User buyer, String status) {
        this.buyer = buyer;
        this.status = status;
    }

}
