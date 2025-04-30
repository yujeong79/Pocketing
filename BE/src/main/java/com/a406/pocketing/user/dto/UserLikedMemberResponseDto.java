package com.a406.pocketing.user.dto;

import com.a406.pocketing.user.entity.UserLikedMember;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLikedMemberResponseDto {
    private Long memberId;
    private String name;

    public static UserLikedMemberResponseDto of(UserLikedMember userLikedMember) {
        return UserLikedMemberResponseDto.builder()
                .memberId(userLikedMember.getLikedMemberId())
                .name(userLikedMember.getMember().getName())
                .build();
    }

}
