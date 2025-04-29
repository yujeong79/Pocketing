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

    @Override
    public List<MemberResponseDto> getMembersByGroupId(Long userId, Long groupId) {
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

        // 🔥 사용자가 관심 등록한 멤버 ID 리스트 조회
        List<UserLikedMember> likedMembers = userLikedMemberRepository.findByUserIdAndGroupId(userId, groupId);
        Set<Long> likedMemberIds = likedMembers.stream()
                .map(UserLikedMember::getMemberId)
                .collect(Collectors.toSet());


        // 🔥 전체 멤버에 대해 관심 여부 매핑해서 응답
        return members.stream()
                .map(m -> new MemberResponseDto(
                        m.getMemberId(),
                        m.getName(),
                        likedMemberIds.contains(m.getMemberId())  // 관심 여부 체크
                ))
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

        // 관심 멤버 ID 리스트
        List<Long> likedMemberIds = likedMembers.stream()
                .map(UserLikedMember::getMemberId)
                .toList();

        List<Member> members = memberRepository.findAllById(likedMemberIds);

        return members.stream()
                .map(m -> new MemberResponseDto(
                        m.getMemberId(),
                        m.getName(),
                        true   // 🔥 여기선 무조건 true
                ))
                .collect(Collectors.toList());
    }
}
