package com.a406.pocketing.member.service;

import com.a406.pocketing.member.dto.MemberResponseDto;

import java.util.List;

public interface MemberService {
    List<MemberResponseDto> getMembersByGroupId(Long userId, Long groupId);  // 로그인된 사용자만 조회

    List<MemberResponseDto> getAllMembersByGroupId(Long groupId);  // 로그인 없이 그룹별 멤버 조회
}
