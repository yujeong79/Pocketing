package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.chat.entity.ChatMessage;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class MessagePageResponseDto {
    /** 로그인 사용자가 채팅방에 입장 시 페이지네이션된 메시지들을 응답하기 위한 DTO **/
    private Integer currentPage;
    private Integer totalPages;
    private Boolean hasNext;
    private List<ChatMessageResponseDto> messageList;

    public static MessagePageResponseDto from(Page<ChatMessage> messagePage) {
        return MessagePageResponseDto.builder()
                .currentPage(messagePage.getNumber())
                .totalPages(messagePage.getTotalPages())
                .hasNext(messagePage.hasNext())
                .messageList(messagePage.getContent().stream()
                        .map(ChatMessageResponseDto::from)
                        .toList())
                .build();
    }

}
