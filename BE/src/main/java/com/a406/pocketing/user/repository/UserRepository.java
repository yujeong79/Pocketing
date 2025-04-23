package com.a406.pocketing.user.repository;

import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
