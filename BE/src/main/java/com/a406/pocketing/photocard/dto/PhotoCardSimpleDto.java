package com.a406.pocketing.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PhotoCardSimpleDto {
    private Long cardId;
    private String cardImageUrl;
}
