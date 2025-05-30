package com.a406.pocketing.user.dto.response;

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
                .memberId(userLikedMember.getMember().getMemberId())
                .name(userLikedMember.getMember().getName())
                .build();
    }

}
