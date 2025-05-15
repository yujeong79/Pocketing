package com.a406.pocketing.matching.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AiResolveResponseDto {
    private Long groupId;
    private String groupDisplayName;
    private String groupNameKo;
    private String groupNameEn;
    private Long memberId;
    private String memberName;

    public AiResolveResponseDto(Long groupId, String groupDisplayName, String groupNameKo, String groupNameEn) {
        this.groupId = groupId;
        this.groupDisplayName = groupDisplayName;
        this.groupNameKo = groupNameKo;
        this.groupNameEn = groupNameEn;
        this.memberId = null;
        this.memberName = null;
    }

    public AiResolveResponseDto(Long groupId, String groupDisplayName, String groupNameKo, String groupNameEn, Long memberId, String memberName) {
        this.groupId = groupId;
        this.groupDisplayName = groupDisplayName;
        this.groupNameKo = groupNameKo;
        this.groupNameEn = groupNameEn;
        this.memberId = memberId;
        this.memberName = memberName;
    }
}


