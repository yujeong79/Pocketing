package com.a406.pocketing.group.repository;

import com.a406.pocketing.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByNameEn(String nameEn);
    Optional<Group> findByNameKo(String nameKo);

    Optional<Group> findByGroupId(Long groupId);

}