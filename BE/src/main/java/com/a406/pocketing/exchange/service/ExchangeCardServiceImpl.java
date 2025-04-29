package com.a406.pocketing.exchange.service;

import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.parser.BooleanNode;
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
        Boolean isOwned = requestDto.getIsOwned();
        Long albumId = requestDto.getAlbumId();
        Long memberId = requestDto.getMemberId();
        String description = requestDto.getDescription();
        String exchangeImageUrl = requestDto.getExchangeImageUrl();

        // 1. userId + isOwned + status = ACTIVE인 기존 카드 탐색
        ExchangeCard existingCard = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, isOwned);

        if(existingCard != null){
            // 2. 있으면 update
            exchangeCardRepository.updateCardInfo(
                    existingCard.getExchangeCardId(),
                    albumId,
                    memberId,
                    description,
                    exchangeImageUrl
            );
        } else {
            // 3. 없으면 insert
            ExchangeCard newCard = ExchangeCard.builder()
                    .userId(userId)
                    .albumId(albumId)
                    .memberId(memberId)
                    .isOwned(isOwned)
                    .description(description)
                    .exchangeImageUrl(exchangeImageUrl)
                    .status("ACTIVE")
                    .build();
            exchangeCardRepository.save(newCard);
            existingCard = newCard;
        }

        // group, album, member 이름 조회 필요

        // 4. 응답 DTO 구성
        return ExchangeCardResponseDto.builder()
                .exchangeCardId(existingCard.getExchangeCardId())
                .isOwned(isOwned)
                .group("group")
                .album("album")
                .member("member")
                .build();
    }
}
