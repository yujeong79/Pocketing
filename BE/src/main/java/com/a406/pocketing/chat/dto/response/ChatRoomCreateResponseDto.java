package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomCreateResponseDto {
    private Long roomId;

    public static ChatRoomCreateResponseDto from(ChatRoom chatRoom) {
        return ChatRoomCreateResponseDto.builder()
                .roomId(chatRoom.getRoomId())
                .build();
    }
}
