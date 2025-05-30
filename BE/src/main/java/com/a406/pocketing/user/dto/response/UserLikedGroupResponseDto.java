package com.a406.pocketing.user.dto.response;

import com.a406.pocketing.user.entity.UserLikedGroup;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLikedGroupResponseDto {
    private Long userId;
    private Long groupId;
    private String groupDisplayName;
    private String groupNameKo;
    private String groupNameEn;
    private String groupImageUrl;

    public static UserLikedGroupResponseDto of(UserLikedGroup userLikedGroup) {
        return UserLikedGroupResponseDto.builder()
                .userId(userLikedGroup.getUser().getUserId())
                .groupId(userLikedGroup.getGroup().getGroupId())
                .groupDisplayName(userLikedGroup.getGroup().getDisplayName())
                .groupNameKo(userLikedGroup.getGroup().getNameKo())
                .groupNameEn(userLikedGroup.getGroup().getNameEn())
                .groupImageUrl(userLikedGroup.getGroup().getGroupImageUrl())
                .build();
    }
}
