package com.a406.pocketing.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OAuthUserResponseDto {
    private String oauthProvider;
    private String providerId;
}
