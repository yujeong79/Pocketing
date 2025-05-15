package com.a406.pocketing.group.repository;

import com.a406.pocketing.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByGroupId(Long groupId);

    @Query("""
        SELECT g FROM Group g
        WHERE LOWER(g.nameKo) = LOWER(:name) OR LOWER(g.nameEn) = LOWER(:name)
        ORDER BY g.nameKo ASC
    """)
    Optional<Group> findByNameKoOrNameEn(@Param("name") String name);

}