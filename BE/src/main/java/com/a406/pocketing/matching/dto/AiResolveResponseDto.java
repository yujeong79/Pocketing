package com.a406.pocketing.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AiResolveResponseDto {
    private Long groupId;
    private String groupName;
    private Long memberId;
    private String memberName;
}

