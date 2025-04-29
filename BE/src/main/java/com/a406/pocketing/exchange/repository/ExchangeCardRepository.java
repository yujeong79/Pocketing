package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExchangeCardRepository extends JpaRepository<ExchangeCard, Long> {
    // 1. userId + isOwned + status = 'ACTIVE' 조회
    @Query("SELECT e from ExchangeCard  e WHERE e.userId = :userId AND e.isOwned AND e.status = 'ACTIVE'")
    ExchangeCard findActiveCardByUserIdAndIsOwned(@Param("userId") Long userId, Boolean isOwned);

    // 2. 기존 카드 정보 수정 (albumId, memberId, description, exchangeImageUrl 업데이트)
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ExchangeCard e SET e.albumId = :albumId, e.memberId = :memberId, e.description = :description, e.exchangeImageUrl = :exchangeImageUrl WHERE e.exchangeCardId = :exchangeCardId")
    int updateCardInfo(
            @Param("exchangeCardId") Long exchangeCardId,
            @Param("albumId") Long albumId,
            @Param("memberId") Long memberId,
            @Param("description") String description,
            @Param("exchangeImageUrl") String exchangeImageUrl
    );
}
