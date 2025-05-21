package com.a406.pocketing.chat.repository;

import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("""
        SELECT c FROM ChatRoom c
        WHERE (
            (:post IS NULL AND c.exchangeRequest = :exchangeRequest)
            OR (:exchangeRequest IS NULL AND c.post = :post)
        )
        AND (
            (c.user1 = :user1 AND c.user2 = :user2)
                OR
            (c.user1 = :user2 AND c.user2 = :user1)
        )
    """)
    Optional<ChatRoom> findChatRoomByExactMatch(ExchangeRequest exchangeRequest, Post post, User user1, User user2);
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
        JOIN FETCH chatRoom.exchangeRequest
        WHERE (chatRoom.user1.userId = :userId OR chatRoom.user2.userId = :userId)
            AND chatRoom.exchangeRequest IS NOT NULL
    """)
    List<ChatRoom> findAllExchangeChatRoomWithUserAndExchange(Long userId);
}
