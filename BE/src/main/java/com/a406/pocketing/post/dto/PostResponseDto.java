package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostResponseDto {
    private Long postId;
    private Long cardId;
    private String groupNameKo;
    private String groupNameEn;
    private String groupImageUrl;
    private String memberName;
    private String albumTitle;
    private String postImageUrl;
    private Integer avgPrice;
}
