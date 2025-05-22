package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;

public interface ExchangeCardService {

    ExchangeCardResponseDto registerExchangeCard(Long userId, ExchangeCardRequestDto requestDto);
}
