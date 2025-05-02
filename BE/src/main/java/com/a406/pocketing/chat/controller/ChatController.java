package com.a406.pocketing.chat.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.chat.dto.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.ChatMessageResponseDto;
import com.a406.pocketing.chat.dto.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.ChatRoomResponseDto;
import com.a406.pocketing.chat.service.ChatService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;
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
    public void sendMessage(@Payload ChatMessageRequestDto chatMessageRequestDto, Principal principal) {
        if (principal == null) {
            throw new BadRequestHandler(USER_NOT_FOUND);
        }

        CustomUserDetails user = (CustomUserDetails) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        ChatMessageResponseDto chatMessageResponseDto = chatService.saveMessage(chatMessageRequestDto, user.getUserId()); // 메시지 DB 저장

        // 수신자에게 메시지 전송
        messagingTemplate.convertAndSendToUser(
                chatMessageResponseDto.getReceiverId().toString(),
                "/queue/messages",
                chatMessageResponseDto
        );
    }
}
