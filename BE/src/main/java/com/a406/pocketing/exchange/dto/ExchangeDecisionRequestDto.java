package com.a406.pocketing.exchange.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExchangeDecisionRequestDto {
    private Long exchangeRequestId;
    private Boolean accepted;
}
