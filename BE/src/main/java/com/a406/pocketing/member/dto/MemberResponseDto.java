package com.a406.pocketing.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private Long memberId;
    private String name;
    private boolean isInterest;
    private String groupNameKo;
    private String groupNameEn;
}
