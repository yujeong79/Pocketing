package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.request.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.request.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.response.ChatMessageResponseDto;
import com.a406.pocketing.chat.dto.response.ChatRoomCreateResponseDto;
import com.a406.pocketing.chat.dto.response.ChatRoomEnterResponseDto;
import com.a406.pocketing.chat.dto.response.ChatRoomListItemResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {
    ChatRoomCreateResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto);
    ChatMessageResponseDto saveMessage(ChatMessageRequestDto chatMessageRequestDto, Long senderId);
    List<ChatRoomListItemResponseDto> getAllPostChatRoom(Long userId);
    List<ChatRoomListItemResponseDto> getAllExchangeChatRoom(Long userId);
    ChatRoomEnterResponseDto enterChatRoom(Long userId, Long roomId, Pageable pageable);
}
