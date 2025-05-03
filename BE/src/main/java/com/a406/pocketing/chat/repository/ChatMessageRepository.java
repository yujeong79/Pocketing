package com.a406.pocketing.chat.repository;

import com.a406.pocketing.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    @Query("""
        SELECT m FROM ChatMessage m
        WHERE m.chatRoom.roomId = :roomId
        ORDER BY m.createdAt DESC
        LIMIT 1
    """)
    Optional<ChatMessage> findLastMessageByRoomId(Long roomId);
}
