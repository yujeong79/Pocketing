package com.a406.pocketing.member.repository;

import com.a406.pocketing.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(Long memberId);
    boolean existsByGroupId(Long groupId);
    List<Member> findByGroupId(Long groupId);

}
