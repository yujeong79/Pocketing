package com.a406.pocketing.notification.repository;

import com.a406.pocketing.notification.entity.FcmToken;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
    // 현재 로그인된 디바이스(활성 상태인 것) 하나만 조회
    @Query("SELECT t FROM FcmToken t WHERE t.user.userId = :userId AND t.isActive = true ORDER BY t.createdAt DESC")
    Optional<FcmToken> findFirstActiveTokenByUserId(@Param("userId") Long userId);

    Optional<FcmToken> findByToken(String token);

    @Modifying
    @Query("UPDATE FcmToken f SET f.isActive = false WHERE f.token = :token")
    void updateIsActiveFalseByToken(@Param("token") String token);

    @Query("SELECT f.token FROM FcmToken f WHERE f.user.userId = :userId AND f.isActive = true")
    List<String> findActiveTokensByUserId(@Param("userId") Long userId);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE FcmToken f SET f.isActive = false WHERE f.token = :token")
    void deactivateToken(@Param("token") String token);
}
