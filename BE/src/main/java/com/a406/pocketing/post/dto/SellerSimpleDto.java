package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SellerSimpleDto {
    private Long postId;
    private String nickname;
    private Boolean isVerified;
    private Integer price;
    private String status;
    private String groupNameKo;
    private String groupNameEn;
    private String groupImageUrl;
    private String memberName;
    private String albumTitle;
    private String postImageUrl;
}
