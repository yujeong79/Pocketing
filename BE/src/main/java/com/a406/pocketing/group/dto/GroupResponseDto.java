package com.a406.pocketing.group.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GroupResponseDto {
    private Long groupId;
    private String groupNameKo;
    private String groupNameEn;
    private String groupImageUrl;
    private boolean isInterest;
}

