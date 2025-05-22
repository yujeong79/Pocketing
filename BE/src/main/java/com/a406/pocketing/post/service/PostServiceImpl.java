package com.a406.pocketing.post.service;

import com.a406.pocketing.chat.entity.ChatRoom;
import com.a406.pocketing.chat.repository.ChatRoomRepository;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.photocard.repository.PhotoCardRepository;
import com.a406.pocketing.photocard.service.PhotoCardService;
import com.a406.pocketing.post.dto.*;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PhotoCardRepository photoCardRepository;
    private final UserRepository userRepository;
    private final PhotoCardService photoCardService;
    private final ChatRoomRepository chatRoomRepository;
    private static final DateTimeFormatter ISO_FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

    @Override
    @Transactional
    public List<PostRegisterResponseDto> registerPost(Long userId,  List<PostRegisterRequestDto> requestDtos) {

        if (requestDtos == null || requestDtos.isEmpty()) {
            throw new GeneralException(ErrorStatus.POST_ID_REQUIRED);
        }

        User sellerUser = userRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.USER_NOT_FOUND));

        List<PostRegisterResponseDto> responseList = new ArrayList<>();

        for (PostRegisterRequestDto requestDto : requestDtos){
            if (requestDto.getCardId() == null) {
                throw new GeneralException(ErrorStatus.CARD_ID_REQUIRED);
            }
            if (requestDto.getPostImageUrl() == null || requestDto.getPostImageUrl().isEmpty()) {
                throw new GeneralException(ErrorStatus.IMAGE_URL_REQUIRED);
            }
            if (requestDto.getPrice() == null) {
                throw new GeneralException(ErrorStatus.PRICE_REQUIRED);
            }

            PhotoCard photoCard = photoCardRepository.findById(requestDto.getCardId())
                    .orElseThrow(() -> new GeneralException(ErrorStatus.PHOTOCARD_NOT_FOUND));

            Post post = Post.builder()
                    .seller(sellerUser)
                    .photoCard(photoCard)
                    .price(requestDto.getPrice())
                    .postImageUrl(requestDto.getPostImageUrl())
                    .status("AVAILABLE")
                    .build();

            Post savedPost = postRepository.save(post);
            responseList.add(new PostRegisterResponseDto(savedPost.getPostId()));

            // 시세 갱신
            photoCardService.updatePrice(requestDto.getCardId(), requestDto.getPrice());

        }
        return responseList;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponseDto> getPostsByGroup(Long groupId, Long albumId, Pageable pageable) {
        return postRepository.findPostsByGroupId(groupId, albumId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponseDto> getPostsByMember(Long memberId, Long albumId, Pageable pageable) {
        return postRepository.findFilteredPosts(memberId, albumId, pageable);
    }



    @Override
    @Transactional(readOnly = true)
    public SellerListResponseDto getSellersByCardId(Long cardId, Pageable pageable) {
        if (cardId == null) {
            throw new GeneralException(ErrorStatus.CARD_ID_REQUIRED);
        }

        Page<SellerSimpleDto> sellers = postRepository.findSellersByCardId(cardId, pageable);

        if (sellers.isEmpty()) {
            throw new GeneralException(ErrorStatus.PHOTOCARD_NOT_FOUND);
        }

        int avgPrice = sellers.stream()
                .mapToInt(SellerSimpleDto::getPrice)
                .sum() / sellers.getContent().size();

        return new SellerListResponseDto(avgPrice, sellers);
    }

    @Override
    @Transactional(readOnly = true)
    public PostDetailResponseDto getPostDetail(Long postId, Long currentUserId) {
        if (postId == null) {
            throw new GeneralException(ErrorStatus.POST_ID_REQUIRED);
        }

        return postRepository.findPostDetailById(postId, currentUserId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.POST_NOT_FOUND));
    }

    @Override
    @Transactional
    public void updatePost(Long postId, Long userId, PostUpdateRequestDto dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.POST_NOT_FOUND));

        if (!post.getSeller().getUserId().equals(userId)) {
            throw new GeneralException(ErrorStatus.POST_EDIT_FORBIDDEN);
        }
        int originalPrice = post.getPrice(); // 기존 가격

        Long cardId = post.getPhotoCard().getCardId();
        photoCardService.decreasePrice(cardId, originalPrice); // 기존 가격 제거
        photoCardService.updatePrice(cardId, dto.getPrice());  // 새로운 가격 추가
        post.update(dto.getPrice());

    }

    @Override
    @Transactional
    public void deletePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.POST_NOT_FOUND));

        if (!post.getSeller().getUserId().equals(userId)) {
            throw new GeneralException(ErrorStatus.POST_DELETE_FORBIDDEN);
        }

        Long cardId = post.getPhotoCard().getCardId();
        int price = post.getPrice();

        postRepository.delete(post);
        photoCardService.decreasePrice(cardId, price);  // 삭제된 가격 제거
    }

    @Override
    @Transactional
    public void updatePostStatus(Long userId, PostUpdateStatusRequestDto postUpdateStatusRequestDto) {
        // 1. 채팅방과 관련된 판매글 조회
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(postUpdateStatusRequestDto.getRoomId()).orElseThrow(() -> new GeneralException(ErrorStatus.CHAT_ROOM_NOT_FOUND));
        Post post = Optional.ofNullable(chatRoom.getPost()).orElseThrow(() -> new GeneralException(ErrorStatus.CHAT_ROOM_POST_NOT_FOUND));

        // 2. 사용자가 판매글의 판매자가 맞는지 검증
        if(!post.getSeller().getUserId().equals(userId)) {
            throw new GeneralException(ErrorStatus.POST_EDIT_FORBIDDEN);
        }

        // 3. 채팅방의 상태를 변경
        switch(postUpdateStatusRequestDto.getStatus()) {
            case "AVAILABLE" -> {
                post.updateStatus(null, "AVAILABLE");
            }
            case "COMPLETED" -> {
                User buyer = chatRoom.getUser1().getUserId().equals(userId) ? chatRoom.getUser2() : chatRoom.getUser1();
                post.updateStatus(buyer, "COMPLETED");
            }
        }

    }

    @Override
    @Transactional(readOnly = true)
    public CheapestPostDto getCheapestPostByCardId(Long cardId) {
        if (cardId == null) {
            throw new GeneralException(ErrorStatus.CARD_ID_REQUIRED);
        }
        PhotoCard photoCard = photoCardRepository.findById(cardId)
            .orElseThrow(() -> new GeneralException(ErrorStatus.PHOTOCARD_NOT_FOUND));
        Optional<Post> cheapestPostOpt = postRepository.findCheapestByCardId(cardId);
        if (cheapestPostOpt.isPresent()) {
            return convertPostToDto(cheapestPostOpt.get());
        }
        return createEmptyPostDto(photoCard);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, CheapestPostDto> getCheapestPostsByCardIds(List<Long> cardIds) {
        if (cardIds == null || cardIds.isEmpty()) {
            return Map.of();
        }
        List<Post> cheapestPosts = postRepository.findCheapestByCardIds(cardIds);
        Map<Long, CheapestPostDto> result = cheapestPosts.stream()
            .collect(Collectors.toMap(
                post -> post.getPhotoCard().getCardId(),
                this::convertPostToDto
            ));
        for (Long cardId : cardIds) {
            if (!result.containsKey(cardId)) {
                photoCardRepository.findById(cardId).ifPresent(photoCard -> {
                    result.put(cardId, createEmptyPostDto(photoCard));
                });
            }
        }
        return result;
    }
    @Override
    public List<PostListItemResponseDto> getMyAvailablePosts(Long userId) {
        List<Post> postList = postRepository.findPostsByUserIdAndStatusWithAll(userId, "AVAILABLE");
        return postList.stream()
                .map(PostListItemResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostListItemResponseDto> getMyCompletedPosts(Long userId) {
        List<Post> postList = postRepository.findPostsByUserIdAndStatusWithAll(userId, "COMPLETED");
        return postList.stream()
                .map(PostListItemResponseDto::from)
                .collect(Collectors.toList());
    }

    private CheapestPostDto convertPostToDto(Post post) {
        return CheapestPostDto.builder()
            .card_id(post.getPhotoCard().getCardId())
            .post_id(post.getPostId())
            .price(post.getPrice())
            .post_image_url(post.getPostImageUrl())
            .nickname(post.getSeller().getNickname())
            .last_updated(post.getCreateAt().format(ISO_FORMATTER))
            .build();
    }

    private CheapestPostDto createEmptyPostDto(PhotoCard photoCard) {
        return CheapestPostDto.builder()
            .card_id(photoCard.getCardId())
            .post_id(null)
            .price(null)
            .post_image_url(photoCard.getCardImageUrl())
            .nickname("판매자 없음")
            .last_updated(LocalDateTime.now().format(ISO_FORMATTER))
            .build();
    }
}

