package com.a406.pocketing.member.repository;

import com.a406.pocketing.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByGroupId(Long groupId);

    boolean existsByGroupId(Long groupId);
}
