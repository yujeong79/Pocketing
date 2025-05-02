package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.ChatMessageDto;
import com.a406.pocketing.chat.dto.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.ChatRoomResponseDto;

public interface ChatService {
    ChatRoomResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto);
    void saveMessage(ChatMessageDto chatMessageDto);
}
