package com.a406.pocketing.chat.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(
        name = "message_status",
        indexes = {
                @Index(columnList = "roomId, receiverId")
        }
)
public class MessageStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageStatusId;

    private Long roomId;
    private Long messageId;
    private Long receiverId;
    private LocalDateTime readAt;

    @PrePersist
    public void prePersist() {
        this.readAt = this.readAt == null ? ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime() : this.readAt;
    }
}
