package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.UserLocationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLocationHistoryRepository extends JpaRepository<UserLocationHistory, Long> {
}
