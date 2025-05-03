package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.chat.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class ChatRoomEnterResponseDto {
    private LinkedPostResponseDto likedPost;
    private LinkedExchangeResponseDto likedExchange;
    private MessagePageResponseDto messagePage;

    public static ChatRoomEnterResponseDto of(
            LinkedPostResponseDto linkedPost,
            LinkedExchangeResponseDto linkedExchange,
            MessagePageResponseDto messagePage
    ) {
        return ChatRoomEnterResponseDto.builder()
                .likedPost(linkedPost)
                .likedExchange(linkedExchange)
                .messagePage(messagePage)
                .build();
    }
}
