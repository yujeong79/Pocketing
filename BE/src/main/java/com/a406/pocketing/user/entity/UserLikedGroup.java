package com.a406.pocketing.user.entity;

import com.a406.pocketing.group.entity.Group;
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
        name = "user_liked_group",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"userId", "groupId"})
        }
)
public class UserLikedGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likedGroupId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id")
    private Group group;
}
