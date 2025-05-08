package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExchangeCardRepository extends JpaRepository<ExchangeCard, Long> {
    // 1. userId + isOwned + status = 'ACTIVE' 조회
    @Query("SELECT e from ExchangeCard  e WHERE e.user.userId = :userId AND e.isOwned = :isOwned AND e.status = 'ACTIVE'")
    ExchangeCard findActiveCardByUserIdAndIsOwned(@Param("userId") Long userId, @Param("isOwned")Boolean isOwned);

    @Query(value = """
        SELECT 
            ec.exchange_card_id AS cardId,
            u.user_id AS userId,
            ec.is_owned AS isOwned,
            ec.description AS content,
            ec.exchange_image_url AS imageUrl,
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
        WHERE ec.status = 'ACTIVE'
            AND ec.is_owned = true
            AND ec.album_id = :myWantedAlbumId
            AND ec.member_id = :myWantedMemberId
            AND ec.user_id != :myUserId
            AND ST_DWithin(ul.location, :myLocation, :range)
            AND EXISTS (
                SELECT 1 FROM exchange_card sub 
                WHERE sub.user_id = u.user_id
                    AND sub.is_owned = false
                    AND sub.status = 'ACTIVE'
                    AND sub.album_id = :myOwnedAlbumId
                    AND sub.member_id = :myOwnedMemberId
                )
        ORDER BY distance ASC
        LIMIT 100
    """, nativeQuery = true)
    List<Object[]> findNearbyExchangeCardsWithMatchType(
            @Param("myUserId") Long myUserId,
            @Param("myLocation") Point myLocation,
            @Param("myWantedAlbumId") Long myWantedAlbumId,
            @Param("myWantedMemberId") Long myWantedMemberId,
            @Param("myOwnedAlbumId") Long myOwnedAlbumId,
            @Param("myOwnedMemberId") Long myOwnedMemberId,
            @Param("range") Double range
    );



}
