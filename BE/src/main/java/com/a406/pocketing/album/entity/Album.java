package com.a406.pocketing.album.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(
        name = "albums",
        indexes = {
                @Index(name = "idx_albums_group_id", columnList = "group_id") // 그룹 기준 검색
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_albums_group_id_title", columnNames = {"group_id", "title"}) // 같은 그룹 내 앨범명 유니크
        }
)
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;

    @Column(nullable = false)
    private Long groupId;

    @Column(nullable = false, length = 100)
    private String title;
}
