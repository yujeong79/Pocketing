package com.a406.pocketing.group.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
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
