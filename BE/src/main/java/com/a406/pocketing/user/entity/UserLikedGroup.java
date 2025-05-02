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
                @UniqueConstraint(columnNames = {"user_id", "group_id"})
        },
        indexes = {
                @Index(columnList = "user_id, group_id")
        }
)
public class UserLikedGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likedGroupId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE"
    ))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", foreignKey = @ForeignKey(
            foreignKeyDefinition = "FOREIGN KEY (group_id) REFERENCES groups(group_id) ON DELETE CASCADE"
    ))
    private Group group;
}
