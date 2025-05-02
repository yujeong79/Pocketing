package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.dto.NearbyExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResult;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface ExchangeCardRepository extends JpaRepository<ExchangeCard, Long> {
    // 1. userId + isOwned + status = 'ACTIVE' 조회
    @Query("SELECT e from ExchangeCard  e WHERE e.user.userId = :userId AND e.isOwned AND e.status = 'ACTIVE'")
    ExchangeCard findActiveCardByUserIdAndIsOwned(@Param("userId") Long userId, Boolean isOwned);

    @Query(value = """
        SELECT
            ec.exchange_card_id AS cardId,
            ec.is_owned AS isOwned,
            ec.album_id AS albumId,
            ec.member_id AS memberId,
            ec.description AS content,
            ec.exchange_image_url AS imageUrl,
            u.user_id AS user Id, 
            u.nickname AS nickname,
            g.name_ko AS groupName,
            a.title AS albumTitle,
            m.name AS memberName,
            ST_Distance(ul.location, :myLocation) AS distance
        FROM exchange_card ec    
        JOIN user_location ul ON ec.user_id = ul.user_id
        JOIN users u ON ec.user_id = u.user_id
        JOIN albums a ON ec.album_id = a.album_id
        JOIN groups g ON ec.group_id = g.group_id
        JOIN members m ON ec.member_id = m.member_id
        WHERE
            ec.status = 'ACTIVE'
            AND ec.user_id != :myUserId
            AND ST_DWithin(ul.location, :myLocation, :range)
        ORDER BY ST_Distance(ul.location, :myLocation)
        LIMIT 20   
        """, nativeQuery = true)
    List<NearbyExchangeCardResult> findNearbyExchangeCandidates(
            @Param("myLocation") Point myLocation,
            @Param("myUserId") Long myUserId,
            @Param("range") Integer range
    );

}
