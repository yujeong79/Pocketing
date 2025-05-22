package com.a406.pocketing.exchange.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class ExchangeLocationResponseDto {
    private Double latitude;
    private Double longitude;
}
