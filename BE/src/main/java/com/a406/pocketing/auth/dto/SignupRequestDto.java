package com.a406.pocketing.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String oauthProvider;
    private String providerId;
    private String nickname;
    private String profileImageUrl;
}
