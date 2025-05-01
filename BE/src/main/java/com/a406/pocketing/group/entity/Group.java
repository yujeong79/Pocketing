package com.a406.pocketing.group.entity;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "groups")
@Slf4j
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(nullable = false, length = 50)
    private String nameKo;

    @Column(nullable = false, length = 50)
    private String nameEn;

    @Column(nullable = false)
    private String groupImageUrl;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY)
    private List<Member> members;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY)
    private List<Album> albums;
}
