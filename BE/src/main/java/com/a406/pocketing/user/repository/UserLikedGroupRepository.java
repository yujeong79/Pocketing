package com.a406.pocketing.user.repository;

import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.user.entity.UserLikedGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikedGroupRepository extends JpaRepository<UserLikedGroup, Long> {
    Optional<UserLikedGroup> findByUserUserIdAndGroup(Long userId, Group group);
    void deleteByUserUserIdAndGroup(Long userId, Group group);
}
