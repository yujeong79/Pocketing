package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExchangeCardRepository extends JpaRepository<ExchangeCard, Long> {
    // 1. userId + isOwned + status = 'ACTIVE' 조회
    @Query("SELECT e from ExchangeCard  e WHERE e.user.id = :userId AND e.isOwned AND e.status = 'ACTIVE'")
    ExchangeCard findActiveCardByUserIdAndIsOwned(@Param("userId") Long userId, Boolean isOwned);

}
