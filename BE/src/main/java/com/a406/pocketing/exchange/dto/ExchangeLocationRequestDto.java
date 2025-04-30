package com.a406.pocketing.exchange.dto;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ExchangeLocationRequestDto {

    @NotNull(message = "위도는 필수입니다.")
    private Double latitude;

    @NotNull(message = "경도는 필수입니다.")
    private Double longitude;

    @NotNull(message = "위치 범위는 필수입니다.")
    @Min(value = 100)
    @Max(value = 500)
    private Integer range;

    @NotNull(message = "isAutoDetected 값은 필수입니다.")
    private Boolean isAutoDetected;

    private String locationName;
}
