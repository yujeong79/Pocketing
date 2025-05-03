package com.a406.pocketing.chat.dto.request;

import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRequestDto {
    private Long user1Id;
    private Long user2Id;
    private Long postId;
    private Long exchangeId;

    public static ChatRoom toEntity(User user1, User user2, Post post, Long exchangeId) {
        return ChatRoom.builder()
                .user1(user1)
                .user2(user2)
                .post(post)
                .exchangeId(exchangeId)
                .build();
    }
}
