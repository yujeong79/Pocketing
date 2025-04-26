package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExchangeCardServiceImpl implements ExchangeCardService{

    private final ExchangeCardRepository exchangeCardRepository;

    @Override
    @Transactional
    public ExchangeCardResponseDto registerExchangeCard(Long userId, ExchangeCardRequestDto requestDto) {
        // 1. 앨범, 멤버 존재 여부 검증
        // 2. 이미 등록된 카드인지 검증
        // 3. 카드 저장
        // 4. 응답 구성
        return null;
    }
}
