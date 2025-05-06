package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.FcmToken;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {
    List<FcmToken> findByUserAndIsActiveTrue(User user);
}
