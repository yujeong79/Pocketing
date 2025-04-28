package com.a406.pocketing.member.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.member.dto.MemberResponseDto;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.entity.UserLikedMember;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.member.repository.UserLikedMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final UserLikedMemberRepository userLikedMemberRepository;

    @Override
    public List<MemberResponseDto> getMembersByGroupId(Long groupId) {
        if (groupId == null) {
            throw new GeneralException(ErrorStatus.GROUP_NAME_REQUIRED);
        }

        boolean exists = memberRepository.existsByGroupId(groupId);
        if (!exists) {
            throw new GeneralException(ErrorStatus.GROUP_NOT_FOUND);
        }

        List<Member> members = memberRepository.findByGroupId(groupId);

        if (members.isEmpty()) {
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        return members.stream()
                .map(m -> new MemberResponseDto(m.getMemberId(), m.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<MemberResponseDto> getLikedMembersByGroupId(Long userId, Long groupId) {
        if (groupId == null) {
            throw new GeneralException(ErrorStatus.GROUP_NAME_REQUIRED);
        }

        boolean likedGroupExists = userLikedMemberRepository.existsByUserIdAndGroupId(userId, groupId);
        if (!likedGroupExists) {
            throw new GeneralException(ErrorStatus.GROUP_NOT_FOUND);
        }

        List<UserLikedMember> likedMembers = userLikedMemberRepository.findByUserIdAndGroupId(userId, groupId);

        if (likedMembers.isEmpty()) {
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        List<Long> memberIds = likedMembers.stream()
                .map(UserLikedMember::getMemberId)
                .collect(Collectors.toList());

        List<Member> members = memberRepository.findAllById(memberIds);

        return members.stream()
                .map(m -> new MemberResponseDto(m.getMemberId(), m.getName()))
                .collect(Collectors.toList());
    }
}
