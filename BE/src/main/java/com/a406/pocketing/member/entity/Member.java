package com.a406.pocketing.member.entity;

import com.a406.pocketing.group.entity.Group;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Slf4j
@Table(
        name = "members",
        indexes = {
                @Index(name = "idx_members_group_id", columnList = "group_id") // 그룹 기준 검색 빠르게
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_members_group_id_name", columnNames = {"group_id", "name"}) // 같은 그룹에 같은 이름 멤버 불가
        }
)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", insertable = false, updatable = false)
    private Group group;

    @Column(nullable = false, length = 50)
    private String name;
}
