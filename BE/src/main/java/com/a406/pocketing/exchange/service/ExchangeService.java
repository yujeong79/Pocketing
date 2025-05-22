package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeDecisionRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeRequestDto;

public interface ExchangeService {
    void sendExchangeRequest(Long requesterId, ExchangeRequestDto requestDto);

    void respondToExchange(Long userId, ExchangeDecisionRequestDto requestDto);
}
