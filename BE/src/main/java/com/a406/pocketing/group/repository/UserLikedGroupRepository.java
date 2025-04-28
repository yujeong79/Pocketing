package com.a406.pocketing.group.repository;

import com.a406.pocketing.group.entity.UserLikedGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLikedGroupRepository extends JpaRepository<UserLikedGroup, Long> {
    List<UserLikedGroup> findByUserId(Long userId);
}
