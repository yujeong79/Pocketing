package com.a406.pocketing.chat.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkedExchangeResponseDto {
    /** 로그인 사용자가 채팅방에 입장 시 채팅방과 연결된 교환요청을 응답하기 위한 DTO **/
    private Long exchangeRequestId;
    private ExchangeCardResponseDto requester;
    private ExchangeCardResponseDto responder;

    @Getter @Builder
    private static class ExchangeCardResponseDto {
        private Long userId;
        private String groupName;
        private String memberName;
        private String albumName;
        private String exchangeImageUrl;
    }
}
