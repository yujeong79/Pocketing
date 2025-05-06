package com.a406.pocketing.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPageRequestDto {
    private String nickname;
    private String profileImageUrl;
    private String address;
    private String bank;
    private String account;
}
