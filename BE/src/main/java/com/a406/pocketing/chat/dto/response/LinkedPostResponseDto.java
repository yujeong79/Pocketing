package com.a406.pocketing.chat.dto.response;

import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.post.entity.Post;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkedPostResponseDto {
    /** 로그인 사용자가 채팅방에 입장 시 채팅방과 연결된 거래글을 응답하기 위한 DTO **/
    private Long postId;
    private PhotocardResponseDto photocard;
    private Integer price;
    private String status;

    public static LinkedPostResponseDto of(Post post, PhotocardResponseDto photocardDto) {
        return LinkedPostResponseDto.builder()
                .postId(post.getPostId())
                .photocard(photocardDto)
                .price(post.getPrice())
                .status(post.getStatus())
                .build();
    }

    @Getter @Builder
    public static class PhotocardResponseDto {
        private Long cardId;
        private String memberName;
        private String albumTitle;
        private String cardImageUrl;

        public static PhotocardResponseDto from(PhotoCard photoCard) {
            return PhotocardResponseDto.builder()
                    .cardId(photoCard.getCardId())
                    .memberName(photoCard.getMember().getName())
                    .albumTitle(photoCard.getAlbum().getTitle())
                    .cardImageUrl(photoCard.getCardImageUrl())
                    .build();
        }
    }
}
