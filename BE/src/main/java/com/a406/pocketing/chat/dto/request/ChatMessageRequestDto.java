package com.a406.pocketing.chat.dto.request;

import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequestDto {
    private Long roomId;
    private String messageContent;

    public static ChatMessage toEntity(ChatRoom chatRoom, User sender, ChatMessageRequestDto chatMessageRequestDto) {
        return ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .messageContent(chatMessageRequestDto.getMessageContent())
                .build();
    }
}
