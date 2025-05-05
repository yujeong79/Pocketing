package com.a406.pocketing.photocard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PhotoCardListResponse {
    private List<PhotoCardSimpleDto> photoCards;
}
