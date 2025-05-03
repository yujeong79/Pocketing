package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.*;
import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.chat.entity.MessageStatus;
import com.a406.pocketing.chat.repository.ChatMessageRepository;
import com.a406.pocketing.chat.repository.ChatRoomRepository;
import com.a406.pocketing.chat.repository.MessageStatusRepository;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MessageStatusRepository messageStatusRepository;

    /**
     * 채팅방을 생성 혹은 조회하기 위한 서비스
     * @param chatRoomRequestDto
     * @return
     */
    @Override
    public ChatRoomResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto) {
        // TODO: ExchangeRequest 엔티티 로직 수정
        User user1 = userRepository.findByUserId(chatRoomRequestDto.getUser1Id()).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        User user2 = userRepository.findByUserId(chatRoomRequestDto.getUser2Id()).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        Post post = postRepository.findByPostId(chatRoomRequestDto.getPostId()).orElseThrow(() -> new BadRequestHandler(POST_NOT_FOUND));

        Optional<ChatRoom> chatroomOpt = chatRoomRepository.findChatRoomByExactMatch(
                chatRoomRequestDto.getExchangeId(),
                post,
                user1,
                user2
            );

        if(chatroomOpt.isPresent()) { // 채팅방이 있으면 반환
            return ChatRoomResponseDto.of(chatroomOpt.get());
        }

        // 채팅방이 없으면 새로 생성해서 반환
        ChatRoom chatRoom = ChatRoom.builder()
                .user1(user1)
                .user2(user2)
                .post(post)
                .exchangeId(chatRoomRequestDto.getExchangeId())
                .build();

        chatRoomRepository.save(chatRoom);

        return ChatRoomResponseDto.of(chatRoom);
    }

    /**
     * 채팅 메시지를 저장하기 위한 서비스
     * @param chatMessageRequestDto
     * @param senderId
     * @return
     */
    @Override
    public ChatMessageResponseDto saveMessage(ChatMessageRequestDto chatMessageRequestDto, Long senderId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(chatMessageRequestDto.getRoomId()).orElseThrow(() -> new BadRequestHandler(CHAT_ROOM_NOT_FOUND));
        User sender = userRepository.findByUserId(senderId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        User receiver = chatRoom.getReceiver(sender.getUserId());

        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .sender(sender)
                .messageContent(chatMessageRequestDto.getMessageContent())
                .build();

        chatMessageRepository.save(chatMessage);
        saveMessageStatus(chatMessage, receiver);

        return ChatMessageResponseDto.of(chatMessage, sender, receiver);
    }

    /**
     * 내부 로직용
     * 메시지를 DB에 저장 시 메시지의 MessageStatus(읽음 상태)를 저장하기 위한 서비스
     * @param chatMessage
     * @param receiver
     */
    private void saveMessageStatus(ChatMessage chatMessage, User receiver) {
        MessageStatus messageStatus = MessageStatus.builder()
                .roomId(chatMessage.getChatRoom().getRoomId())
                .messageId(chatMessage.getMessageId())
                .receiverId(receiver.getUserId())
                .build();

        messageStatusRepository.save(messageStatus);
    }

    /**
     * 로그인한 사용자의 거래하기 채팅방 전체 조회를 위한 서비스
     * @param userId
     * @return
     */
    @Override
    public List<ChatRoomListItemResponseDto> getAllPostChatRoom(Long userId) {
        // N+1 문제 방지를 위해 JOIN FETCH로 Repository 개선
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllPostChatRoomWithUserAndPost(userId);

        return chatRoomList.stream()
                .map(chatRoom -> toChatRoomListItemDto(chatRoom, userId))
                .toList();
    }

    /**
     * 로그인한 사용자의 교환하기 채팅방 전체 조회를 위한 서비스
     * @param userId
     * @return
     */
    @Override
    public List<ChatRoomListItemResponseDto> getAllExchangeChatRoom(Long userId) {
        // N+1 문제 방지를 위해 JOIN FETCH로 Repository 개선
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllExchangeChatRoomWithUserAndExchange(userId);

        return chatRoomList.stream()
                .map(chatRoom -> toChatRoomListItemDto(chatRoom, userId))
                .toList();
    }

    /**
     * 내부 로직용
     * 채팅방 조회 로직과 별개로 ResponseDto로 변환하는 로직을 따로 수행하기 위한 서비스
     * @param chatRoom
     * @param userId
     * @return
     */
    private ChatRoomListItemResponseDto toChatRoomListItemDto(ChatRoom chatRoom, Long userId) {
        ChatMessage defaultMessage = ChatMessage.builder().messageContent("").build();

        User receiver = chatRoom.getReceiver(userId); // 로그인한 사용자 외의 채팅 참여자 조회
        ChatMessage lastChatMessage = chatMessageRepository.findLastMessageByRoomId(chatRoom.getRoomId()).orElse(defaultMessage); // 채팅방의 가장 최근 메시지 조회
        Integer unreadMessageCount = messageStatusRepository.countUnreadMessagesByRoomId(userId, chatRoom.getRoomId()); // 사용자의 안읽은 메시지 조회

        if(chatRoom.getPost() != null) { // 거래하기 채팅방인 경우
            return ChatRoomListItemResponseDto.of(
                    chatRoom,
                    receiver,
                    chatRoom.getPost().getPostId(),
                    null,
                    chatRoom.getPost().getPostImageUrl(),
                    lastChatMessage,
                    unreadMessageCount
            );
        }

        // TODO: ExchageRequest 엔티티 나오면 수정!
        // 교환하기 채팅방인 경우
        return ChatRoomListItemResponseDto.of(
                chatRoom,
                receiver,
                null,
                chatRoom.getExchangeId(),
                "",
                lastChatMessage,
                unreadMessageCount
        );
    }

}
