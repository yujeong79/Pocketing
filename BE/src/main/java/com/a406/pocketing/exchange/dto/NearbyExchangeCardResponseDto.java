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

    public static NearbyExchangeCardResponseDto fromNativeResult(Object[] row) {
        return NearbyExchangeCardResponseDto.builder()
                .userId(((Number) row[1]).longValue())
                .nickname((String) row[5])
                .distance(((Number) row[9]).doubleValue())
                .card(CardDto.builder()
                        .cardId(((Number) row[0]).longValue())
                        .isOwned((Boolean) row[2])
                        .content((String) row[3])
                        .imageUrl((String) row[4])
                        .group((String) row[6])
                        .album((String) row[7])
                        .member((String) row[8])
                        .build())
                .build();
    }
}
