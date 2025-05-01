package com.a406.pocketing.user.repository;

import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserLikedMemberRepository extends JpaRepository<UserLikedMember, Long> {
    @Query("""
        SELECT ulm FROM UserLikedMember ulm
        JOIN ulm.member m
        WHERE ulm.user = :user AND m.group.groupId = :groupId
    """)
    List<UserLikedMember> findByUserAndMemberGroup(User user, Long groupId);
}
