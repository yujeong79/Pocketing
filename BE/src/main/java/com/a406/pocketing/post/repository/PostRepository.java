package com.a406.pocketing.post.repository;

import com.a406.pocketing.post.dto.PostResponseDto;
import com.a406.pocketing.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByPostId(Long postId);

    @Query("""
        SELECT new com.a406.pocketing.post.dto.PostResponseDto(
            p.postId,
            p.photoCard.cardId,
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

}

