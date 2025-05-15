package com.a406.pocketing.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AiResolveResponseDto {
    private Long groupId;
    private String displayName;
    private Long memberId;
    private String memberName;

    public AiResolveResponseDto(Long groupId, String displayName) {
        this.groupId = groupId;
        this.displayName = displayName;
        this.memberId = null;
        this.memberName = null;
    }

    public AiResolveResponseDto(Long groupId, String displayName, Long memberId, String memberName) {
        this.groupId = groupId;
        this.displayName = displayName;
        this.memberId = memberId;
        this.memberName = memberName;
    }
}


