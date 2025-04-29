package com.a406.pocketing.member.repository;

import com.a406.pocketing.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByGroupId(Long groupId);

    List<Member> findByGroupId(Long groupId);

    List<Member> findByGroupIdAndMemberIdIn(Long groupId, List<Long> memberIds);
}
