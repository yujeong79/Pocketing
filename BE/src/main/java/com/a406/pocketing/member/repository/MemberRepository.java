package com.a406.pocketing.member.repository;

import com.a406.pocketing.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByMemberId(Long memberId);
    boolean existsByGroupGroupId(Long groupId);

    @Query("""
    SELECT m FROM Member m
    JOIN FETCH m.group g
    WHERE m.name = :memberName AND (g.nameKo = :groupName OR g.nameEn = :groupName)
""")
    Optional<Member> findByGroupNameAndMemberName(@Param("groupName") String groupName, @Param("memberName") String memberName);

    @Query("""
    SELECT m FROM Member m
    JOIN FETCH m.group
    WHERE m.group.groupId = :groupId
""")
    List<Member> findWithGroupByGroupId(@Param("groupId") Long groupId);

    @Query("""
    SELECT m FROM Member m
    WHERE m.group.groupId = :groupId
    AND (
        LOWER(m.name) LIKE CONCAT('%', :memberName, '%') OR
        LOWER(:memberName) LIKE CONCAT('%', LOWER(m.name), '%')
    )
    """)
    Optional<Member> findByGroupIdAndName(
            @Param("groupId") Long groupId,
            @Param("memberName") String memberName
    );





}
