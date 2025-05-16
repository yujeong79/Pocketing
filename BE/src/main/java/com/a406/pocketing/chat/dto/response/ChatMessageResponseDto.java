package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
public class ChatMessageResponseDto {
    private Long messageId;
    private Long roomId;
    private Long senderId;
    private Long receiverId;
    private String messageContent;
    private LocalDateTime createdAt;

    public static ChatMessageResponseDto of(ChatMessage chatMessage, User sender, User receiver) {
        return ChatMessageResponseDto.builder()
                .messageId(chatMessage.getMessageId())
                .roomId(chatMessage.getChatRoom().getRoomId())
                .senderId(sender.getUserId())
                .receiverId(receiver.getUserId())
                .messageContent(chatMessage.getMessageContent())
                .createdAt(chatMessage.getCreatedAt())
                .build();
    }

    public static ChatMessageResponseDto from(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
                .messageId(chatMessage.getMessageId())
                .roomId(chatMessage.getChatRoom().getRoomId())
                .senderId(chatMessage.getSender().getUserId())
                .messageContent(chatMessage.getMessageContent())
                .createdAt(chatMessage.getCreatedAt())
                .build();
    }
}
