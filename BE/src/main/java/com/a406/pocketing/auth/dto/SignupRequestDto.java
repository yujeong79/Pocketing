package com.a406.pocketing.auth.dto;

import com.a406.pocketing.user.dto.UserLikedInfoRequestDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String oauthProvider;
    private String providerId;
    private String nickname;
    private String profileImageUrl;

    private UserLikedInfoRequestDto likedInfo;
}
