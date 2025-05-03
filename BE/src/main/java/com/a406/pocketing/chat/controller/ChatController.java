package com.a406.pocketing.chat.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.chat.dto.*;
import com.a406.pocketing.chat.service.ChatService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;
import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.CHAT_ROOM_FETCH_SUCCESS;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    /**
     * 채팅방 생성 혹은 조회
     * @param chatRoomrequestDto
     * @return
     */
    @PostMapping("/room")
    public ApiResponse<?> createOrGetRoom(@RequestBody ChatRoomRequestDto chatRoomrequestDto) {
        ChatRoomResponseDto chatRoomResponseDto = chatService.createOrGetRoom(chatRoomrequestDto);
        return ApiResponse.of(CHAT_ROOM_FETCH_SUCCESS, chatRoomResponseDto);
    }

    /**
     * 클라이언트 -> 서버 메시지 전송
     * @param chatMessageRequestDto
     * @param principal
     */
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

    /**
     * 로그인 사용자의 거래하기 채팅방 전체 조회
     * @param loginUser
     * @return
     */
    @GetMapping("/room/post")
    public ApiResponse<?> getAllPostChatRoom(@AuthenticationPrincipal CustomUserDetails loginUser) {
        List<ChatRoomListItemResponseDto> chatRoomList = chatService.getAllPostChatRoom(loginUser.getUserId());
    }

}
