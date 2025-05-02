package com.a406.pocketing.chat.service;

import com.a406.pocketing.chat.dto.ChatMessageDto;
import com.a406.pocketing.chat.dto.ChatRoomRequestDto;
import com.a406.pocketing.chat.dto.ChatRoomResponseDto;
import com.a406.pocketing.chat.entity.ChatMessage;
import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.chat.repository.ChatRoomRepository;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.POST_NOT_FOUND;
import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

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

    @Override
    public void saveMessage(ChatMessageDto chatMessageDto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .build();
    }

}
