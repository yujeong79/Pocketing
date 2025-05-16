package com.a406.pocketing.photocard.repository;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.photocard.entity.PhotoCard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PhotoCardRepository extends JpaRepository<PhotoCard, Long> {
    List<PhotoCard> findByAlbumAndMember(Album album, Member member);

    Page<PhotoCard> findByHasEmbeddingFalse(Pageable pageable);

    @Query("""
        SELECT p.cardId FROM PhotoCard p
        JOIN p.member m
        JOIN m.group g
        WHERE g.nameKo = :groupName OR g.nameEn = :groupName
    """)
    Page<Long> findCardIdsByGroupName(@Param("groupName") String groupName, Pageable pageable);

    @Query("""
        SELECT p.cardId FROM PhotoCard p
        WHERE p.createdAt >= :date
    """)
    Page<Long> findCardIdsCreatedRecently(@Param("date") LocalDateTime date, Pageable pageable);

    @Query("""
        SELECT p FROM PhotoCard p
        JOIN FETCH p.member m
        JOIN FETCH m.group g
        JOIN FETCH p.album a
        WHERE p.cardId IN :ids
    """)
    List<PhotoCard> findMetadataByCardIds(@Param("ids") List<Long> ids);

    @Query("""
        SELECT p FROM PhotoCard p
        JOIN FETCH p.member m
        JOIN FETCH m.group g
        JOIN FETCH p.album a
        WHERE p.cardId = :cardId
        """)
    PhotoCard findMetadataByCardId(@Param("cardId") Long cardId);

    @Query("""
    SELECT p FROM PhotoCard p
    JOIN FETCH p.member m
    JOIN FETCH m.group g
    JOIN FETCH p.album a
    WHERE p.hasEmbedding = false
    AND p.cardId IN :ids
""")
    List<PhotoCard> findMetadataUnembedded(@Param("ids") List<Long> ids);
}
