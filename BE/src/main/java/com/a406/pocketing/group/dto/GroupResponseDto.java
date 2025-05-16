package com.a406.pocketing.group.dto;

import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.member.dto.MemberResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GroupResponseDto {
    private Long groupId;
    private String groupDisplayName;
    private String groupNameKo;
    private String groupNameEn;
    private String groupImageUrl;
    private boolean isInterest;

    private List<MemberResponseDto> members;

    public static GroupResponseDto from(Group group) {
        return GroupResponseDto.builder()
                .groupId(group.getGroupId())
                .groupDisplayName(group.getDisplayName())
                .groupNameKo(group.getNameKo())
                .groupNameEn(group.getNameEn())
                .groupImageUrl(group.getGroupImageUrl())
                .isInterest(false)
                .build();
    }
}

