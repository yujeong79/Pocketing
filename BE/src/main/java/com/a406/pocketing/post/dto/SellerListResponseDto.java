package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@AllArgsConstructor
public class SellerListResponseDto {
    private int avgPrice;
    private Page<SellerSimpleDto> content;
}
