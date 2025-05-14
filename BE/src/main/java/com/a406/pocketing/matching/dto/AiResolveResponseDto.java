package com.a406.pocketing.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AiResolveResponseDto {
    private Long groupId;
    private String groupName;
    private Long memberId;
    private String memberName;

    public AiResolveResponseDto(Long groupId, String groupName) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.memberId = null;
        this.memberName = null;
    }

    public AiResolveResponseDto(Long groupId, String groupName, Long memberId, String memberName) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.memberId = memberId;
        this.memberName = memberName;
    }
}

