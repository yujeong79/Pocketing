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
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final UserLikedMemberRepository userLikedMemberRepository;

    /**
     * 그룹에 속한 모든 멤버 조회 (좋아요 여부 포함)
     */
    @Override
    public List<MemberResponseDto> getMembersByGroupId(Long userId, Long groupId) {
        if (groupId == null) {
            throw new GeneralException(ErrorStatus.GROUP_NAME_REQUIRED);
        }

        boolean groupExists = memberRepository.existsByGroupId(groupId);
        if (!groupExists) {
            throw new GeneralException(ErrorStatus.GROUP_NOT_FOUND);
        }

        // 그룹에 속한 모든 멤버 조회
        List<Member> members = memberRepository.findByGroupId(groupId);

        if (members.isEmpty()) {
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        // 유저가 좋아요한 멤버들 ID 조회
        Set<Long> likedMemberIds = userLikedMemberRepository.findByUserId(userId)
                .stream()
                .map(UserLikedMember::getMemberId)
                .collect(Collectors.toSet());

        // 멤버 정보 + 좋아요 여부 매핑
        return members.stream()
                .map(m -> new MemberResponseDto(
                        m.getMemberId(),
                        m.getName(),
                        likedMemberIds.contains(m.getMemberId())  // 좋아요 여부
                ))
                .collect(Collectors.toList());
    }

    /**
     * 그룹에 속한 좋아요한 멤버만 조회
     */
    @Override
    public List<MemberResponseDto> getLikedMembersByGroupId(Long userId, Long groupId) {
        if (groupId == null) {
            throw new GeneralException(ErrorStatus.GROUP_NAME_REQUIRED);
        }

        // 유저가 좋아요한 모든 멤버 조회
        List<UserLikedMember> likedMembers = userLikedMemberRepository.findByUserId(userId);

        if (likedMembers.isEmpty()) {
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        List<Long> likedMemberIds = likedMembers.stream()
                .map(UserLikedMember::getMemberId)
                .collect(Collectors.toList());

        // 그룹에 속하면서, 좋아요한 멤버만 조회
        List<Member> members = memberRepository.findByGroupIdAndMemberIdIn(groupId, likedMemberIds);

        if (members.isEmpty()) {
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        return members.stream()
                .map(m -> new MemberResponseDto(
                        m.getMemberId(),
                        m.getName(),
                        true // 여기는 무조건 좋아요한 멤버만 조회니까 true 고정
                ))
                .collect(Collectors.toList());
    }
}
