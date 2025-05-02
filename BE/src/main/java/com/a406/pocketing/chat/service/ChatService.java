package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.ChatMessageResponseDto;
import com.a406.pocketing.chat.dto.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.ChatRoomResponseDto;

public interface ChatService {
    ChatRoomResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto);
    ChatMessageResponseDto saveMessage(ChatMessageRequestDto chatMessageRequestDto, Long senderId);
}
