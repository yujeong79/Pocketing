package com.a406.pocketing.exchange.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class NearbyExchangeCardResponseDto {
    private Long userId;
    private String nickname;
    private Double distance;
    private CardDto card;
    private Boolean isRequested;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class CardDto {
        private Long cardId;
        private Boolean isOwned;
        private String group;
        private String album;
        private String member;
        private String content;
        private String imageUrl;
    }
}
