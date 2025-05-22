package com.a406.pocketing.member.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
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

    @Column(nullable = false)
    private Long groupId;  // FK처럼 사용 (group 테이블의 group_id)

    @Column(nullable = false, length = 50)
    private String name;
}
