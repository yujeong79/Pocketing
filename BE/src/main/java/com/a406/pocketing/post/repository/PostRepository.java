package com.a406.pocketing.post.repository;

import com.a406.pocketing.post.dto.PostDetailResponseDto;
import com.a406.pocketing.post.dto.PostResponseDto;
import com.a406.pocketing.post.dto.SellerSimpleDto;
import com.a406.pocketing.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByPostId(Long postId);

    @Query("""
        SELECT new com.a406.pocketing.post.dto.PostResponseDto(
            p.postId,
            p.photoCard.cardId,
            g.displayName,
            g.nameKo,
            g.nameEn,
            g.groupImageUrl,
            m.name,
            a.title,
            p.postImageUrl,
            p.price
        )
        FROM Post p
        JOIN p.photoCard pc
        JOIN pc.member m
        JOIN m.group g
        JOIN pc.album a
        WHERE m.memberId = :memberId
        AND (:albumId IS NULL OR a.albumId = :albumId)
        ORDER BY p.createAt DESC
    """)
    Page<PostResponseDto> findFilteredPosts(@Param("memberId") Long memberId,
        @Param("albumId") Long albumId,
        Pageable pageable);


    @Query("""
    SELECT new com.a406.pocketing.post.dto.SellerSimpleDto(
        p.postId,
        u.nickname,
        u.isVerified,
        p.price,
        p.status,
        g.displayName,
        g.nameKo,
        g.nameEn,
        g.groupImageUrl,
        m.name,
        a.title,
        p.postImageUrl
    )
    FROM Post p
    JOIN p.seller u
    JOIN p.photoCard pc
    JOIN pc.member m
    JOIN pc.album a
    JOIN m.group g
    WHERE pc.cardId = :cardId
    ORDER BY p.price ASC
""")
    Page<SellerSimpleDto> findSellersByCardId(@Param("cardId") Long cardId, Pageable pageable);


    @Query("""
    SELECT new com.a406.pocketing.post.dto.PostDetailResponseDto(
        p.postId,
        p.postImageUrl,
        p.price,
        p.createAt,
        p.status,
        pc.cardId,
        pc.cardImageUrl,
        m.name,
        g.displayName,
        g.nameKo,
        g.nameEn,
        g.groupImageUrl,
        a.title,
        u.userId,
        u.nickname,
        u.isVerified,
        u.profileImageUrl,
        CASE WHEN u.userId = :currentUserId THEN true ELSE false END
    )
    FROM Post p
    JOIN p.photoCard pc
    JOIN pc.member m
    JOIN pc.album a
    JOIN m.group g
    JOIN p.seller u
    WHERE p.postId = :postId
""")
    Optional<PostDetailResponseDto> findPostDetailById(@Param("postId") Long postId, @Param("currentUserId") Long currentUserId);

    List<Post> findAllByPhotoCard_CardId(Long cardId);

    @Query("SELECT MIN(p.price) FROM Post p WHERE p.photoCard.cardId = :cardId")
    Integer findMinPriceByPhotoCardId(@Param("cardId") Long cardId);

    @Query("SELECT MAX(p.price) FROM Post p WHERE p.photoCard.cardId = :cardId")
    Integer findMaxPriceByPhotoCardId(@Param("cardId") Long cardId);

    @Query("SELECT p FROM Post p WHERE p.seller.userId = :userId AND p.status = 'AVAILABLE'")
    List<Post> findAvailablePostsByUserId(Long userId);

    @Query("SELECT p FROM Post p WHERE p.seller.userId = :userId AND p.status = 'COMPLETED'")
    List<Post> findCompletedPostsByUserId(Long userId);

    @Query("""
        SELECT p FROM Post p
        JOIN FETCH p.photoCard pc
        JOIN FETCH pc.album a
        JOIN FETCH pc.member m
        JOIN FETCH m.group
        WHERE p.seller.userId = :userId AND p.status = :status
    """)
    List<Post> findPostsByUserIdAndStatusWithAll(Long userId, String status);

    @Query("""
        SELECT p FROM Post p
        JOIN FETCH p.seller s
        JOIN FETCH p.photoCard pc
        WHERE pc.cardId = :cardId
        AND p.status = 'AVAILABLE'
        ORDER BY p.price ASC
        LIMIT 1
    """)
    Optional<Post> findCheapestByCardId(@Param("cardId") Long cardId);

    @Query("""
        SELECT p FROM Post p
        JOIN FETCH p.seller s
        JOIN FETCH p.photoCard pc
        WHERE pc.cardId IN :cardIds
        AND p.status = 'AVAILABLE'
        AND p.price = (
            SELECT MIN(p2.price)
            FROM Post p2
            WHERE p2.photoCard.cardId = pc.cardId
            AND p2.status = 'AVAILABLE'
        )
    """)
    List<Post> findCheapestByCardIds(@Param("cardIds") List<Long> cardIds);

    @Query("""
    SELECT new com.a406.pocketing.post.dto.PostResponseDto(
        p.postId,
        p.photoCard.cardId,
        g.displayName,
        g.nameKo,
        g.nameEn,
        g.groupImageUrl,
        m.name,
        a.title,
        p.postImageUrl,
        p.price
    )
    FROM Post p
    JOIN p.photoCard pc
    JOIN pc.member m
    JOIN m.group g
    JOIN pc.album a
    WHERE (:albumId IS NULL OR a.albumId = :albumId)
    ORDER BY p.createAt DESC
""")
    Page<PostResponseDto> findAllPosts(@Param("albumId") Long albumId, Pageable pageable);

    @Query("""
    SELECT new com.a406.pocketing.post.dto.PostResponseDto(
        p.postId,
        pc.cardId,
        g.displayName,
        g.nameKo,
        g.nameEn,
        g.groupImageUrl,
        m.name,
        a.title,
        p.postImageUrl,
        p.price
    )
    FROM Post p
    JOIN p.photoCard pc
    JOIN pc.member m
    JOIN m.group g
    JOIN pc.album a
    WHERE g.groupId = :groupId
    AND (:albumId IS NULL OR a.albumId = :albumId)
    ORDER BY p.createAt DESC
""")
    Page<PostResponseDto> findPostsByGroupId(@Param("groupId") Long groupId,
                                             @Param("albumId") Long albumId,
                                             Pageable pageable);


}

