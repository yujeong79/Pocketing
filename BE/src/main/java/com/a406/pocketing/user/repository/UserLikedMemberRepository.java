package com.a406.pocketing.user.repository;

import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserLikedMemberRepository extends JpaRepository<UserLikedMember, Long> {
    @Query("""
        SELECT ulm FROM UserLikedMember ulm
        JOIN ulm.member m
        WHERE ulm.user = :user AND m.group.groupId = :groupId
    """)
    List<UserLikedMember> findByUserAndMemberGroup(User user, Long groupId);

    @Modifying
    @Query("""
        DELETE FROM UserLikedMember ulm
        WHERE ulm.user.userId = :userId
            AND ulm.member.group = :group
    """)
    void deleteByUserIdAndGroup(Long userId, Group group);
    Optional<UserLikedMember> findByUserUserIdAndMember(Long userId, Member member);
    Boolean existsByUserUserIdAndMemberGroup(Long userId, Group group);
}
