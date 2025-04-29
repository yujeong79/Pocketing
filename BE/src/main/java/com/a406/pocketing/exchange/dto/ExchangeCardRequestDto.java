package com.a406.pocketing.exchange.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ExchangeCardRequestDto {
    private Boolean isOwned;
    private Long albumId;
    private Long memberId;
    private String description;
    private String exchangeImageUrl;
}
