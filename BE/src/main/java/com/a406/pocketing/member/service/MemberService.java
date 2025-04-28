package com.a406.pocketing.member.service;

import com.a406.pocketing.member.dto.MemberResponseDto;

import java.util.List;

public interface MemberService {
    List<MemberResponseDto> getMembersByGroupId(Long groupId);

    List<MemberResponseDto> getLikedMembersByGroupId(Long userId, Long groupId);
}
