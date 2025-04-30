package com.a406.pocketing.user.entity;

import com.a406.pocketing.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;
}
