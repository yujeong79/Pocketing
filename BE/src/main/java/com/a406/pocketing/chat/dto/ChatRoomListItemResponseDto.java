package com.a406.pocketing.chat.dto;

import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomListItemResponseDto {
    private Long roomId;
    private Long receiverId;
    private String receiverNickname;
    private Long postId;
    private Long exchangeId;
    private String imageUrl;
    private String lastMessageContent;
    private Integer unreadMessageCount;

    public static ChatRoomListItemResponseDto of(ChatRoom chatRoom, User receiver, Long postId, Long exchangeId, String imageUrl,ChatMessage lastChatMessage, Integer unreadMessageCount) {
        return ChatRoomListItemResponseDto.builder()
                .roomId(chatRoom.getRoomId())
                .receiverId(receiver.getUserId())
                .receiverNickname(receiver.getNickname())
                .postId(postId)
                .exchangeId(exchangeId)
                .imageUrl(imageUrl)
                .lastMessageContent(lastChatMessage.getMessageContent())
                .unreadMessageCount(unreadMessageCount)
                .build();
    }
}
