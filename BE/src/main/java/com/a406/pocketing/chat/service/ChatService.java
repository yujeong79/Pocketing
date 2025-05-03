package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.*;
import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.user.entity.User;

import java.util.List;

public interface ChatService {
    ChatRoomResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto);
    ChatMessageResponseDto saveMessage(ChatMessageRequestDto chatMessageRequestDto, Long senderId);
    List<ChatRoomListItemResponseDto> getAllPostChatRoom(Long userId);
    List<ChatRoomListItemResponseDto> getAllExchangeChatRoom(Long userId);
}
