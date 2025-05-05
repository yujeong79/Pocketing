package com.a406.pocketing.post.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.photocard.repository.PhotoCardRepository;
import com.a406.pocketing.post.dto.PostRegisterRequestDto;
import com.a406.pocketing.post.dto.PostRegisterResponseDto;
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PhotoCardRepository photoCardRepository;
    private final UserRepository userRepository;

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
        }
        return responseList;
    }
}

