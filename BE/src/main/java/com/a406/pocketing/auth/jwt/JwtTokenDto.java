package com.a406.pocketing.auth.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtTokenDto {
    private String accessToken;
}
