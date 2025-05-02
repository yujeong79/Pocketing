package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {
}
