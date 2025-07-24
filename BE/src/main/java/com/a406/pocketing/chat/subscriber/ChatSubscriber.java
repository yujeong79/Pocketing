package com.a406.pocketing.chat.subscriber;

import com.a406.pocketing.chat.dto.request.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.response.ChatMessageResponseDto;
import com.a406.pocketing.chat.service.ChatService;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.notification.service.NotificationService;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatSubscriber implements MessageListener {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String json = new String(message.getBody(), StandardCharsets.UTF_8);
            ChatMessageRequestDto chatMessageRequestDto = new ObjectMapper().readValue(json, ChatMessageRequestDto.class);

            // 1. DB 저장
            ChatMessageResponseDto chatMessageResponseDto = chatService.saveMessage(chatMessageRequestDto, chatMessageRequestDto.getSenderId());

            // 2. WebSocket 전송
            messagingTemplate.convertAndSendToUser(
                    chatMessageResponseDto.getReceiverId().toString(),
                    "/queue/messages",
                    chatMessageResponseDto
            );

            // 3. FCM 전송
            User sender = userRepository.findByUserId(chatMessageResponseDto.getSenderId())
                    .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));

            notificationService.sendChatMessageNotification(
                    chatMessageResponseDto.getReceiverId(),
                    sender.getNickname(),
                    chatMessageResponseDto.getMessageContent(),
                    chatMessageResponseDto.getRoomId()
            );


        } catch (Exception e) {
            log.error("Redis 구독 메시지 처리 실패", e);
        }
    }
}
