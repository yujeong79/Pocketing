package com.a406.pocketing.notification.repository;

import com.a406.pocketing.notification.entity.FcmToken;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
    List<FcmToken> findByUserAndIsActiveTrue(User user);

    Boolean existsByUserAndToken(User user, String token);

    // 현재 로그인된 디바이스(활성 상태인 것) 하나만 조회
    @Query("SELECT t FROM FcmToken t WHERE t.user.userId = :userId AND t.isActive = true ORDER BY t.createdAt DESC")
    Optional<FcmToken> findFirstActiveTokenByUserId(@Param("userId") Long userId);

}
