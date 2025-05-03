package com.a406.pocketing.chat.repository;

import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("""
        SELECT c FROM ChatRoom c
        WHERE c.exchangeId = :exchangeId
            AND c.post = :post
            AND c.user1 = :user1
            AND c.user2 = :user2
    """)
    Optional<ChatRoom> findChatRoomByExactMatch(Long exchangeId, Post post, User user1, User user2);
    Optional<ChatRoom> findByRoomId(Long roomId);

    @Query("""
        SELECT chatRoom FROM ChatRoom chatRoom
        JOIN FETCH chatRoom.user1
        JOIN FETCH chatRoom.user2
        JOIN FETCH chatRoom.post
        WHERE (chatRoom.user1.userId = :userId OR chatRoom.user2.userId = :userId)
            AND chatRoom.post IS NOT NULL
    """)
    List<ChatRoom> findAllPostChatRoomWithUserAndPost(Long userId);

    @Query("""
        SELECT chatRoom FROM ChatRoom chatRoom
        JOIN FETCH chatRoom.user1
        JOIN FETCH chatRoom.user2
        JOIN FETCH chatRoom.exchangeId
        WHERE (chatRoom.user1.userId = :userId OR chatRoom.user2.userId = :userId)
            AND chatRoom.exchangeId IS NOT NULL
    """)
    List<ChatRoom> findAllExchangeChatRoomWithUserAndExchange(Long userId);
}
