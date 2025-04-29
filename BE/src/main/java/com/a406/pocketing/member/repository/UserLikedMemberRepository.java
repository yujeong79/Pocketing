package com.a406.pocketing.member.repository;

import com.a406.pocketing.member.entity.UserLikedMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLikedMemberRepository extends JpaRepository<UserLikedMember, Long> {
    List<UserLikedMember> findByUserIdAndGroupId(Long userId, Long groupId);

    boolean existsByUserIdAndGroupId(Long userId, Long groupId);
}
