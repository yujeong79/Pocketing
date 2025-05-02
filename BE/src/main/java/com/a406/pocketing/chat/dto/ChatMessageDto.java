package com.a406.pocketing.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessageDto {
    private Long messageId;
    private Long roomId;
    private Long senderId;
    private Long receiverId;
    private String messageContent;
    private LocalDateTime createdAt;
}
