package com.a406.pocketing.group.entity;

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
        name = "user_liked_group",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"userId", "groupId"})
        }
)
public class UserLikedGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likedGroupId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long groupId;
}
