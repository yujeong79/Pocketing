package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    Optional<ExchangeRequest> findByExchangeRequestId(Long exchangeRequestId);
}
