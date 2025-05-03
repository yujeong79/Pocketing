package com.a406.pocketing.chat.entity;

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
        name = "chat_message",
        indexes = {
                @Index(columnList = "room_id")
        }
)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (room_id) REFERENCES chat_room(room_id) ON DELETE CASCADE"
    ))
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE"
    ))
    private User sender;

    private String messageContent;
    private LocalDateTime createdAt;
}
