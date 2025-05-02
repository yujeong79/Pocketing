package com.a406.pocketing.chat.entity;

import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(
        name = "chat_room",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user1_id", "user2_id", "post_id", "exchange_id"})
        },
        indexes = {
                @Index(columnList = "exchange_id, post_id, user1_id, user2_id")
        }
)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user1_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (user1_id) REFERENCES users(user_id) ON DELETE CASCADE"
    ))
    private User user1;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user2_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (user2_id) REFERENCES users(user_id) ON DELETE CASCADE"
    ))
    private User user2;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE"
    ))
    private Post post;

//    TODO: ExchangeRequest Entity 생기면 수정
//    @OneToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "exchange_id")
    private Long exchangeId;
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = this.createdAt == null ? LocalDateTime.now() : this.createdAt;
    }

}
