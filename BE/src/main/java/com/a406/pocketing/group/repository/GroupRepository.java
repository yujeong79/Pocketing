package com.a406.pocketing.group.repository;

import com.a406.pocketing.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {

    Optional<Group> findByGroupId(Long groupId);

}