package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeLocationRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeLocationResponseDto;

public interface ExchangeLocationService {

    ExchangeLocationResponseDto registerLocation(Long userId, ExchangeLocationRequestDto requestDto);
}
