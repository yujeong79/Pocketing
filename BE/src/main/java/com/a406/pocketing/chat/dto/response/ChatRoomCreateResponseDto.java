package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
@ToString
public class ChatRoomCreateResponseDto {
    private Long roomId;

    public static ChatRoomCreateResponseDto from(ChatRoom chatRoom) {
        return ChatRoomCreateResponseDto.builder()
                .roomId(chatRoom.getRoomId())
                .build();
    }
}
