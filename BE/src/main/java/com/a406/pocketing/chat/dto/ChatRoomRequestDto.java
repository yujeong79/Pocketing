package com.a406.pocketing.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRequestDto {
    private Long user1Id;
    private Long user2Id;
    private Long postId;
    private Long exchangeId;
}
