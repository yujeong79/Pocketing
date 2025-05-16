package com.a406.pocketing.post.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class PostUpdateStatusRequestDto {
    private Long roomId;
    private String status;
}
