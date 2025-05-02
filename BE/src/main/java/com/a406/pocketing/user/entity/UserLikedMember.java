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
                @Index(columnList = "user_id, member_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "member_id"})
        }
)
public class UserLikedMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likedMemberId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE"
    ))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE CASCADE"
    ))
    private Member member;
}
