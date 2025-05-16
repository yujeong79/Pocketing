package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PostDetailResponseDto {
    private Long postId;
    private String postImageUrl;
    private Integer price;
    private LocalDateTime createdAt;
    private String status;
    private boolean isMine;
    private CardInfo card;
    private SellerInfo seller;

    @Data
    @AllArgsConstructor
    public static class CardInfo {
        private Long cardId;
        private String cardImageUrl;
        private String memberName;
        private String groupDisplayName;
        private String groupNameKo;
        private String groupNameEn;
        private String groupImageUrl;
        private String albumTitle;
    }

    @Data
    @AllArgsConstructor
    public static class SellerInfo {
        private Long sellerId;
        private String nickname;
        private Boolean isVerified;
        private String profileImageUrl;
    }

    public PostDetailResponseDto(Long postId, String postImageUrl, Integer price, LocalDateTime createdAt, String status,
                                 Long cardId, String cardImageUrl, String memberName, String groupDisplayName, String groupNameKo, String groupNameEn,
                                 String groupImageUrl, String albumTitle, Long sellerId, String nickname, Boolean isVerified,
                                 String profileImageUrl, boolean isMine) {
        this.postId = postId;
        this.postImageUrl = postImageUrl;
        this.price = price;
        this.createdAt = createdAt;
        this.status = status;
        this.isMine = isMine;
        this.card = new CardInfo(cardId, cardImageUrl, memberName, groupDisplayName, groupNameKo, groupNameEn, groupImageUrl, albumTitle);
        this.seller = new SellerInfo(sellerId, nickname, isVerified, profileImageUrl);
    }
}