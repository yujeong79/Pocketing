package com.a406.pocketing.user.dto.response;

import com.a406.pocketing.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyPageResponseDto {
    private Long userId;
    private String nickname;
    private String profileImageUrl;
    private Boolean isVerified;
    private String address;
    private String bank;
    private String account;

    public static MyPageResponseDto from(User user) {
        return MyPageResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .isVerified(user.getIsVerified())
                .address(user.getAddress())
                .bank(user.getBank())
                .account(user.getAccount())
                .build();
    }
}
