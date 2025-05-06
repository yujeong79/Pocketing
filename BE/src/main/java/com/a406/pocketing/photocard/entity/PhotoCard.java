package com.a406.pocketing.photocard.entity;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import org.hibernate.type.SqlTypes;

import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Slf4j
@Table(
        name = "photocards",
        indexes = {
                @Index(name = "idx_photocards_album_id", columnList = "album_id"),
                @Index(name = "idx_photocards_member_id", columnList = "member_id")
        }
)
public class PhotoCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String cardImageUrl;

    @ElementCollection
    @CollectionTable(name = "photo_card_tags", joinColumns = @JoinColumn(name = "card_id"))
    @Column(name = "tag")
    private List<String> tags;


}
