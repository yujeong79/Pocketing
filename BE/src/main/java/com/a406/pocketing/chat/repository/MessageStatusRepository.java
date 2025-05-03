package com.a406.pocketing.chat.repository;

import com.a406.pocketing.chat.entity.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MessageStatusRepository extends JpaRepository<MessageStatus, Long> {
    @Query("""
        SELECT COUNT(ms) FROM MessageStatus ms
        WHERE ms.roomId = :roomId
            AND ms.receiverId = :userId
            AND ms.readAt IS NULL
    """)
    Integer countUnreadMessagesByRoomId(Long userId, Long roomId);
}
