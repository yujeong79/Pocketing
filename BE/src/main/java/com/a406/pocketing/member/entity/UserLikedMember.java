package com.a406.pocketing.member.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(
        name = "user_liked_member",
        indexes = {
                @Index(name = "idx_user_liked_member_user_id", columnList = "user_id"),
                @Index(name = "idx_user_liked_member_member_id", columnList = "member_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_user_liked_member_user_id_member_id", columnNames = {"user_id", "member_id"})
        }
)
public class UserLikedMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likedMemberId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long memberId;
}
