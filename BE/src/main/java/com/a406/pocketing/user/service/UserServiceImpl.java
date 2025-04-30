package com.a406.pocketing.user.service;

import com.a406.pocketing.auth.dto.LoginResponseDto;
import com.a406.pocketing.auth.dto.SignupRequestDto;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.common.apiPayload.exception.handler.BadRequestHandler;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.user.dto.UserLikedGroupResponseDto;
import com.a406.pocketing.user.dto.UserLikedInfoRequestDto;
import com.a406.pocketing.user.dto.UserLikedInfoRequestDto.LikedGroupDto;
import com.a406.pocketing.user.dto.UserLikedMemberResponseDto;
import com.a406.pocketing.user.dto.UserResponseDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedGroup;
import com.a406.pocketing.user.entity.UserLikedMember;
import com.a406.pocketing.user.repository.UserLikedGroupRepository;
import com.a406.pocketing.user.repository.UserLikedMemberRepository;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;
    private final UserLikedGroupRepository userLikedGroupRepository;
    private final UserLikedMemberRepository userLikedMemberRepository;

    @Override
    public LoginResponseDto signup(SignupRequestDto signupRequestDto) {
        // 회원가입
        User user = User.builder()
                .oauthProvider(signupRequestDto.getOauthProvider())
                .providerId(signupRequestDto.getProviderId())
                .nickname(signupRequestDto.getNickname())
                .profileImageUrl(signupRequestDto.getProfileImageUrl())
                .isVerified(false)
                .build();

        userRepository.save(user);

        // 관심 그룹 및 멤버 등록
        registerLikedInfo(user.getUserId(), signupRequestDto.getLikedInfo());

        return LoginResponseDto.ofExistingUser(user);
    }

    @Override
    public void registerLikedInfo(Long userId, UserLikedInfoRequestDto likedInfoRequestDto) {
        // 관심 그룹 등록, 그룹 등록 로직 내에서 관심 멤버 등록 수행
        registerLikedGroup(userId, likedInfoRequestDto.getLikedGroupList());
    }

    @Override
    public void registerLikedGroup(Long userId, List<LikedGroupDto> likedGroupList) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));

        List<UserLikedGroup> toSave = new ArrayList<>();
        for(LikedGroupDto likedGroup : likedGroupList) {
            Group group = groupRepository.findByGroupId(likedGroup.getGroupId()).orElseThrow(() -> new BadRequestHandler(GROUP_NOT_FOUND));

            UserLikedGroup entity = UserLikedGroup.builder()
                    .user(user)
                    .group(group)
                    .build();

            toSave.add(entity);

            registerLikedMember(user, likedGroup.getLikedMemberList());
        }

        userLikedGroupRepository.saveAll(toSave);
    }

    @Override
    public void registerLikedMember(User user, List<Long> likedMemberList) {
        List<UserLikedMember> toSave = new ArrayList<>();
        for(Long likedMemberId : likedMemberList) {
            Member member = memberRepository.findByMemberId(likedMemberId).orElseThrow(() -> new BadRequestHandler(MEMBER_NOT_FOUND));

            UserLikedMember entity = UserLikedMember.builder()
                    .user(user)
                    .member(member)
                    .build();

            toSave.add(entity);
        }

        userLikedMemberRepository.saveAll(toSave);
    }

    @Override
    public List<UserLikedGroupResponseDto> getUserLikedGroup(Long userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));

        if(user.getLikedGroups().isEmpty()) { // 유저의 관심 그룹이 없는 경우
            throw new GeneralException(ErrorStatus.GROUP_NOT_FOUND);
        }

        return user.getLikedGroups().stream().map(UserLikedGroupResponseDto::of).collect(Collectors.toList());
    }

    @Override
    public List<UserLikedMemberResponseDto> getUserLikedMemberByGroup(Long userId, Long groupId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        if(user.getLikedMembers().isEmpty()) { // 유저의 관심 멤버가 없는 경우
            throw new GeneralException(ErrorStatus.MEMBER_NOT_FOUND);
        }

        groupRepository.findByGroupId(groupId).orElseThrow(() -> new BadRequestHandler(GROUP_NOT_FOUND));
        List<UserLikedMember> likedMembersByGroup = userLikedMemberRepository.findByUserAndMemberGroup(user, groupId);

        return likedMembersByGroup.stream().map(UserLikedMemberResponseDto::of).collect(Collectors.toList());
    }

    @Override
    public UserResponseDto findById(Long userId) {
        return userRepository.findByUserId(userId)
                .map(UserResponseDto::of)
                .orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
    }

}
