package com.a406.pocketing.chat.dto;

import com.a406.pocketing.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatRoomResponseDto {
    private Long roomId;
    private Long user1Id;
    private Long user2Id;
    private Long postId;
    private Long exchangeId;
    private LocalDateTime createdAt;

    public static ChatRoomResponseDto of(ChatRoom chatRoom) {
        return ChatRoomResponseDto.builder()
                .roomId(chatRoom.getRoomId())
                .user1Id(chatRoom.getUser1().getUserId())
                .user2Id(chatRoom.getUser2().getUserId())
                .postId(chatRoom.getPost().getPostId())
                .exchangeId(chatRoom.getExchangeId())
                .createdAt(chatRoom.getCreatedAt())
                .build();
    }
}
