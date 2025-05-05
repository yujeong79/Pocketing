package com.a406.pocketing.post.dto;

import lombok.Data;

@Data
public class PostUpdateRequestDto {
    private Integer price;
    private String status; // 예: AVAILABLE, IN_PROGRESS
}
