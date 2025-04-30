package com.a406.pocketing.matching.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.matching.dto.AiResolveResponseDto;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;

    public AiResolveResponseDto resolve(String groupName, String memberName) {
        // 그룹 매칭
        Group group = groupRepository.findByNameEn(groupName)
                .or(() -> groupRepository.findByNameKo(groupName))
                .orElseThrow(() -> new GeneralException(ErrorStatus.GROUP_NOT_FOUND));

        // 멤버 매칭 (groupId 내에서)
        Member member = memberRepository.findByGroupIdAndName(group.getGroupId(), memberName)
                .orElseThrow(() -> new GeneralException(ErrorStatus.MEMBER_NOT_FOUND));

        return new AiResolveResponseDto(group.getGroupId(), group.getNameKo(), member.getMemberId(), member.getName());
    }
}
