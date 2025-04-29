package com.a406.pocketing.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostRegisterRequestDto {
    private Long cardId;
    private String postImageUrl;
    private Integer price;
}

