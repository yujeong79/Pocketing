package com.a406.pocketing.exchange.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ExchangeRequestDto {
    private Long responderId;
    private Long responderOwnedCardId;
    private Long requesterOwnedCardId;
}
