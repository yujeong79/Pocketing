package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.request.ChatMessageRequestDto;
import com.a406.pocketing.chat.dto.request.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.response.*;
import com.a406.pocketing.chat.dto.response.LinkedPostResponseDto.PhotocardResponseDto;
import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.chat.entity.MessageStatus;
import com.a406.pocketing.chat.repository.ChatMessageRepository;
import com.a406.pocketing.chat.repository.ChatRoomRepository;
import com.a406.pocketing.chat.repository.MessageStatusRepository;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.chat.dto.response.LinkedExchangeResponseDto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.exchange.repository.ExchangeRequestRepository;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import com.a406.pocketing.user.dto.response.UserResponseDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MessageStatusRepository messageStatusRepository;
    private final ExchangeRequestRepository exchangeRequestRepository;

    /**
     * 채팅방을 생성 혹은 조회하기 위한 서비스
     * @param chatRoomRequestDto
     * @return
     */
    @Override
    public ChatRoomCreateResponseDto createOrGetRoom(ChatRoomRequestDto chatRoomRequestDto) {
        User user1 = userRepository.findByUserId(chatRoomRequestDto.getUser1Id()).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        User user2 = userRepository.findByUserId(chatRoomRequestDto.getUser2Id()).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        Post post = postRepository.findByPostId(chatRoomRequestDto.getPostId()).orElseThrow(() -> new BadRequestHandler(POST_NOT_FOUND));
        ExchangeRequest exchangeRequest = exchangeRequestRepository.findByExchangeRequestId(chatRoomRequestDto.getExchangeId()).orElseThrow(() -> new BadRequestHandler(EXCHANGE_REQUEST_NOT_FOUND));

        Optional<ChatRoom> chatroomOpt = chatRoomRepository.findChatRoomByExactMatch(
                exchangeRequest,
                post,
                user1,
                user2
            );

        if(chatroomOpt.isPresent()) { // 채팅방이 있으면 반환
            return ChatRoomCreateResponseDto.from(chatroomOpt.get());
        }

        // 채팅방이 없으면 새로 생성해서 반환
        ChatRoom chatRoom = ChatRoomRequestDto.toEntity(user1, user2, post, exchangeRequest);
        chatRoomRepository.save(chatRoom);

        return ChatRoomCreateResponseDto.from(chatRoom);
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

        ChatMessage chatMessage = ChatMessageRequestDto.toEntity(chatRoom, sender, chatMessageRequestDto);

        chatMessageRepository.save(chatMessage);
        saveMessageStatus(chatMessage, receiver);

        return ChatMessageResponseDto.of(chatMessage, sender, receiver);
    }

    /**
     * private(내부 로직용)
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
     * private(내부 로직용)
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

        if(chatRoom.getPost() != null) {
            // 거래하기 채팅방인 경우
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

        // 교환하기 채팅방인 경우
        String imageUrl = chatRoom.getExchangeRequest().getRequester().getUserId().equals(userId) ? // 현재 로그인한 사용자가 교환요청자인 경우
                chatRoom.getExchangeRequest().getResponderOwnedCard().getExchangeImageUrl() : // 채팅방 목록에서 보여지는 이미지는 교환응답자의 보유 카드 이미지
                chatRoom.getExchangeRequest().getRequesterOwnedCard().getExchangeImageUrl(); // 현재 로그인한 사용자가 교환응답자일 경우 => 이미지는 교환 요청자의 보유 카드 이미지

        return ChatRoomListItemResponseDto.of(
                chatRoom,
                receiver,
                null,
                chatRoom.getExchangeRequest().getExchangeRequestId(),
                imageUrl,
                lastChatMessage,
                unreadMessageCount
        );
    }

    /**
     * 채팅방 입장을 위한 서비스
     * @param userId
     * @param roomId
     * @param pageable
     * @return
     */
    @Override
    public ChatRoomEnterResponseDto enterChatRoom(Long userId, Long roomId, Pageable pageable) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId).orElseThrow(() -> new BadRequestHandler(CHAT_ROOM_NOT_FOUND));
        validateChatRoomAccess(chatRoom, userId);

        List<ChatRoomParticipantResponseDto> participants = getChatRoomParticipants(chatRoom, userId);
        LinkedPostResponseDto linkedPost = extractLinkedPost(chatRoom);
        LinkedExchangeResponseDto linkedExchange = extractLinkedExchange(chatRoom);
        MessagePageResponseDto messagePage = fetchMessages(chatRoom, pageable, userId);

        return ChatRoomEnterResponseDto.of(participants, linkedPost, linkedExchange, messagePage);
    }

    /**
     * private(내부 로직용)
     * 채팅방에 참여하는 사용자들을 리스트 형태로 반환하기 위한 서비스
     * @param chatRoom
     * @return
     */
    private List<ChatRoomParticipantResponseDto> getChatRoomParticipants(ChatRoom chatRoom, Long loginUserId) {
        User loginUser = userRepository.findByUserId(loginUserId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        User otherUser = chatRoom.getReceiver(loginUserId);

        return Stream.of(
                        ChatRoomParticipantResponseDto.from(loginUser, true),
                        ChatRoomParticipantResponseDto.from(otherUser, false)
            ).toList();
    }

    /**
     * private(내부 로직용)
     * 채팅방과 연관된 거래하기 글을 가져오기 위한 서비스
     * @param chatRoom
     * @return
     */
    private LinkedPostResponseDto extractLinkedPost(ChatRoom chatRoom) {
        return Optional.ofNullable(chatRoom.getPost())
                .map(post -> {
                    PhotocardResponseDto photocardDto = PhotocardResponseDto.from(post.getPhotoCard());
                    return LinkedPostResponseDto.of(post, photocardDto);
                })
                .orElse(null);
    }

    /**
     * private(내부 로직용)
     * 채팅방과 연관된 교환요청을 가져오기 위한 서비스
     * @param chatRoom
     * @return
     */
    private LinkedExchangeResponseDto extractLinkedExchange(ChatRoom chatRoom) {
        return Optional.ofNullable(chatRoom.getExchangeRequest())
                .map(exchangeRequest -> {
                    ExchangeCardResponseDto requesterDto = ExchangeCardResponseDto.of(exchangeRequest.getRequester(), exchangeRequest.getRequesterOwnedCard());
                    ExchangeCardResponseDto responderDto = ExchangeCardResponseDto.of(exchangeRequest.getResponder(), exchangeRequest.getResponderOwnedCard());
                    return LinkedExchangeResponseDto.of(exchangeRequest, requesterDto, responderDto);
                })
                .orElse(null);
    }

    /**
     * private(내부 로직용)
     * 채팅방의 페이지네이션된 메시지들을 가져오기 위한 서비스
     * @param chatRoom
     * @return
     */
    private MessagePageResponseDto fetchMessages(ChatRoom chatRoom, Pageable pageable, Long userId) {
        Page<ChatMessage> messagePage = chatMessageRepository.findByChatRoom(chatRoom, pageable); // 페이지네이션된 메시지들 가져오기
        messageStatusRepository.markAsRead(chatRoom.getRoomId(), userId); // 메시지 읽음 처리 상태 변경

        return MessagePageResponseDto.from(messagePage);
    }

    /**
     * 로그인 사용자가 안읽은 채팅방 메시지 전체 개수 조회를 위한 서비스
     * @param userId
     * @return
     */
    @Override
    public Integer getUnreadMessageCount(Long userId) {
        return messageStatusRepository. countUnreadMessagesByUserId(userId);
    }

    /**
     * 채팅방의 과거 메시지를 더 불러오기 위한 서비스
     * @param userId
     * @param roomId
     * @param pageable
     * @return
     */
    @Override
    public MessagePageResponseDto getChatMessages(Long userId, Long roomId, Pageable pageable) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId).orElseThrow(() -> new BadRequestHandler(CHAT_ROOM_NOT_FOUND));
        validateChatRoomAccess(chatRoom, userId);

        Page<ChatMessage> messagePage = chatMessageRepository.findByChatRoom(chatRoom, pageable); // 페이지네이션된 메시지들 가져오기

        return MessagePageResponseDto.from(messagePage);
    }

    /**
     * private(내부 로직용)
     * 로그인한 사용자가 해당 채팅방에 대한 접근 권한이 있는지 검증하기 위한 서비스
     * @param chatRoom
     * @param userId
     */
    private void validateChatRoomAccess(ChatRoom chatRoom, Long userId) {
        if(!chatRoom.getUser1().getUserId().equals(userId) && !chatRoom.getUser2().getUserId().equals(userId)) {
            throw new BadRequestHandler(CHAT_ROOM_UNAUTHORIZED_USER);
        }
    }

}
