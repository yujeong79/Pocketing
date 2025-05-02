package com.a406.pocketing.chat.controller;

import com.a406.pocketing.chat.dto.ChatMessageDto;
import com.a406.pocketing.chat.dto.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.ChatRoomResponseDto;
import com.a406.pocketing.chat.service.ChatService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.CHAT_ROOM_FETCH_SUCCESS;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @PostMapping("/room")
    public ApiResponse<?> createOrGetRoom(@RequestBody ChatRoomRequestDto chatRoomrequestDto) {
        ChatRoomResponseDto chatRoomResponseDto = chatService.createOrGetRoom(chatRoomrequestDto);
        return ApiResponse.of(CHAT_ROOM_FETCH_SUCCESS, chatRoomResponseDto);
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessageDto chatMessageDto) {
        chatService.saveMessage(chatMessageDto);

        messagingTemplate.convertAndSendToUser(
                chatMessageDto.getReceiverId().toString(),
                "/queue/messages",
                chatMessageDto
        );
    }
}
