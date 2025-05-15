package com.a406.pocketing.matching.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.matching.dto.AiResolveRequestDto;
import com.a406.pocketing.matching.dto.AiResolveResponseDto;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;

    @Override
    public AiResolveResponseDto resolve(String groupName, String memberName) {

        // 0. 이름 정제(앞뒤 공백 제거, 소문자 변환
        String cleanedGroupName = groupName.trim().toLowerCase();
        String cleanedMemberName = memberName.trim().toLowerCase();


        // 1. 그룹 이름으로 그룹 ID 찾기
        Group group = groupRepository.findByNameKoOrNameEn(cleanedGroupName)
                .orElseThrow(() -> new GeneralException(ErrorStatus.GROUP_NOT_FOUND));

        // 2. 해당 그룹 ID + 멤버 이름으로 멤버 찾기
        Optional<Member> optionalMember = memberRepository.findByGroupIdAndName(group.getGroupId(), cleanedMemberName);

        if (optionalMember.isEmpty()) {
            // 그룹만 반환
            return new AiResolveResponseDto(group.getGroupId(), group.getDisplayName());
        }

        Member member = optionalMember.get();

        return new AiResolveResponseDto(
                group.getGroupId(),
                group.getDisplayName(),
                member.getMemberId(),
                member.getName()
        );
    }


    @Override
    public List<AiResolveResponseDto> resolveAll(List<AiResolveRequestDto> requests) {
        List<AiResolveResponseDto> results = new ArrayList<>();

        for (AiResolveRequestDto request : requests) {
            try {
                AiResolveResponseDto result = resolve(request.getGroupName(), request.getMemberName());
                results.add(result);
            } catch (Exception e) {
                // 실패한 항목은 건너뛰거나, 필요하다면 여기서 로깅
                System.out.println("매칭 실패: " + request.getGroupName() + " - " + request.getMemberName());
            }
        }

        return results;
    }
}