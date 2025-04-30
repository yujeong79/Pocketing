package com.a406.pocketing.member.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.member.dto.MemberResponseDto;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedMember;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.user.repository.UserLikedMemberRepository;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    /**
     * 그룹에 속한 모든 멤버 조회 (좋아요 여부 포함)
     */
    @Override
    public List<MemberResponseDto> getMembersByGroupId(Long userId, Long groupId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GeneralException(ErrorStatus.USER_NOT_FOUND));

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
        List<Long> likedMemberIds = user.getLikedMembers().stream()
                .map(userLikedMember -> userLikedMember.getMember().getMemberId())
                .toList();

        // 멤버 정보 + 좋아요 여부 매핑
        return members.stream()
                .map(m -> new MemberResponseDto(
                        m.getMemberId(),
                        m.getName(),
                        likedMemberIds.contains(m.getMemberId())  // 좋아요 여부
                ))
                .collect(Collectors.toList());
    }

}
