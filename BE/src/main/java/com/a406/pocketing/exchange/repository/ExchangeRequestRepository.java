package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    Optional<ExchangeRequest> findByExchangeRequestId(Long exchangeRequestId);
}
