package com.a406.pocketing.group.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GroupLikeResponseDto {
    private List<GroupSimpleDto> groups;

    @Getter
    @Builder
    public static class GroupSimpleDto {
        private Long groupId;
        private String groupNameKo;
        private String groupNameEn;
        private String groupImageUrl;
    }
}

