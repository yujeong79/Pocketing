package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.user.dto.response.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
public class ChatRoomEnterResponseDto {
    private List<ChatRoomParticipantResponseDto> participants;
    private LinkedPostResponseDto linkedPost;
    private LinkedExchangeResponseDto linkedExchange;
    private MessagePageResponseDto messagePage;

    public static ChatRoomEnterResponseDto of(
            List<ChatRoomParticipantResponseDto> participants,
            LinkedPostResponseDto linkedPost,
            LinkedExchangeResponseDto linkedExchange,
            MessagePageResponseDto messagePage
    ) {
        return ChatRoomEnterResponseDto.builder()
                .participants(participants)
                .linkedPost(linkedPost)
                .linkedExchange(linkedExchange)
                .messagePage(messagePage)
                .build();
    }
}
