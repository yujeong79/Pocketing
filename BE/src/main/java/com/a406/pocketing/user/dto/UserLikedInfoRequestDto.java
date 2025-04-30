package com.a406.pocketing.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserLikedInfoRequestDto {

    private List<LikedGroupDto> likedGroupList;

    @Getter @Setter
    public static class LikedGroupDto {
        private Long groupId;
        private List<Long> likedMemberList;
    }

}
