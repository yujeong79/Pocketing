package com.a406.pocketing.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PhotoCardPriceResponseDto {
    private int minPrice;
    private int maxPrice;
    private int avgPrice;
}

