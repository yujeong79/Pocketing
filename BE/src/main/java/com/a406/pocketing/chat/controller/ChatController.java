package com.a406.pocketing.chat.controller;

import com.a406.pocketing.auth.principal.CustomUserDetails;
import com.a406.pocketing.chat.dto.request.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.request.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.response.*;
import com.a406.pocketing.chat.service.ChatService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;
import static com.a406.pocketing.common.apiPayload.code.status.SuccessStatus.*;

@Slf4j
@RestController
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
        ChatRoomCreateResponseDto chatRoomCreateResponseDto = chatService.createOrGetRoom(chatRoomrequestDto);
        return ApiResponse.of(CHAT_ROOM_FETCH_SUCCESS, chatRoomCreateResponseDto);
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
     * 로그인 사용자가 안읽은 채팅방 메시지 전체 개수 조회
     * @param loginUser
     * @return
     */
    @GetMapping("/unread/count")
    public ApiResponse<?> getUnreadMessagesCount(@AuthenticationPrincipal CustomUserDetails loginUser) {
        Integer unreadMessageCount = chatService.getUnreadMessageCount(loginUser.getUserId());

        return ApiResponse.of(CHAT_UNREAD_MESSAGE_COUNT_SUCCESS, unreadMessageCount);
    }

    /**
     * 로그인 사용자의 거래하기 채팅방 전체 조회
     * @param loginUser
     * @return
     */
    @GetMapping("/room/post")
    public ApiResponse<?> getAllPostChatRoom(@AuthenticationPrincipal CustomUserDetails loginUser) {
        List<ChatRoomListItemResponseDto> chatRoomList = chatService.getAllPostChatRoom(loginUser.getUserId());

        return ApiResponse.of(CHAT_ROOM_FETCH_SUCCESS, chatRoomList);
    }

    /**
     * 로그인 사용자의 교환하기 채팅방 전체 조회
     * @param loginUser
     * @return
     */
    @GetMapping("/room/exchange")
    public ApiResponse<?> getAllExchangeChatRoom(@AuthenticationPrincipal CustomUserDetails loginUser) {
        List<ChatRoomListItemResponseDto> chatRoomList = chatService.getAllExchangeChatRoom(loginUser.getUserId());

        return ApiResponse.of(CHAT_ROOM_FETCH_SUCCESS, chatRoomList);
    }

    /**
     * 로그인 사용자가 채팅방의 입장
     * @param loginUser
     * @param roomId
     * @param page
     * @param size
     * @return
     */
    @PostMapping("/room/{roomId}/enter")
    public ApiResponse<?> enterChatRoom(
            @AuthenticationPrincipal CustomUserDetails loginUser,
            @PathVariable Long roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        ChatRoomEnterResponseDto chatRoomEnterResponseDto = chatService.enterChatRoom(loginUser.getUserId(), roomId, pageable);
        return ApiResponse.of(CHAT_ROOM_ENTER_SUCCESS, chatRoomEnterResponseDto);
    }

    /**
     * 채팅방 과거 메시지 조회
     * @param loginUser
     * @param roomId
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/room/{roomId}/messages")
    public ApiResponse<?> getChatMessages(
            @AuthenticationPrincipal CustomUserDetails loginUser,
            @PathVariable Long roomId,
            @RequestParam int page,
            @RequestParam int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        MessagePageResponseDto messagePage = chatService.getChatMessages(loginUser.getUserId(), roomId, pageable);
        return ApiResponse.of(CHAT_MESSAGE_FETCH_SUCCESS, messagePage);
    }

}
