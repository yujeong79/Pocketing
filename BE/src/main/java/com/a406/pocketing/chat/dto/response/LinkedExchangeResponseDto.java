package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkedExchangeResponseDto {
    /** 로그인 사용자가 채팅방에 입장 시 채팅방과 연결된 교환요청을 응답하기 위한 DTO **/
    private Long exchangeRequestId;
    private ExchangeCardResponseDto requester;
    private ExchangeCardResponseDto responder;

    public static LinkedExchangeResponseDto of(ExchangeRequest exchangeRequest, ExchangeCardResponseDto requesterDto, ExchangeCardResponseDto responderDto) {
        return LinkedExchangeResponseDto.builder()
                .exchangeRequestId(exchangeRequest.getExchangeRequestId())
                .requester(requesterDto)
                .responder(responderDto)
                .build();
    }

    @Getter @Builder
    public static class ExchangeCardResponseDto {
        private Long userId;
        private String groupName;
        private String memberName;
        private String albumName;
        private String exchangeImageUrl;

        public static ExchangeCardResponseDto of(User user, ExchangeCard exchangeCard) {
            return ExchangeCardResponseDto.builder()
                    .userId(user.getUserId())
                    .groupName(exchangeCard.getGroup().getDisplayName())
                    .memberName(exchangeCard.getMember().getName())
                    .albumName(exchangeCard.getAlbum().getTitle())
                    .exchangeImageUrl(exchangeCard.getExchangeImageUrl())
                    .build();
        }
    }
}
