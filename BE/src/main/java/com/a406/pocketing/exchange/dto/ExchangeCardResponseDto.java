package com.a406.pocketing.exchange.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExchangeCardResponseDto {
    private Long exchangeCardId;
    private Boolean isOwned;
    private String group;
    private String album;
    private String member;
    private String imageUrl;
}
