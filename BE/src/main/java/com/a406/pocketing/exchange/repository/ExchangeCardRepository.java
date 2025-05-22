package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeCardRepository extends JpaRepository<ExchangeCard, Long> {
}
