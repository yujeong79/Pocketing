package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResponseDto;

import java.util.List;

public interface ExchangeCardService {

    ExchangeCardResponseDto registerExchangeCard(Long userId, ExchangeCardRequestDto requestDto);

    List<NearbyExchangeCardResponseDto> getNearbyExchangeList(Long userId, Integer range);
}
