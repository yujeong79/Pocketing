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
import com.a406.pocketing.user.dto.request.MyPageRequestDto;
import com.a406.pocketing.user.dto.request.UserLikedInfoRequestDto;
import com.a406.pocketing.user.dto.request.UserLikedInfoRequestDto.LikedGroupDto;
import com.a406.pocketing.user.dto.response.MyPageResponseDto;
import com.a406.pocketing.user.dto.response.UserLikedGroupResponseDto;
import com.a406.pocketing.user.dto.response.UserLikedMemberResponseDto;
import com.a406.pocketing.user.dto.response.UserResponseDto;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.entity.UserLikedGroup;
import com.a406.pocketing.user.entity.UserLikedMember;
import com.a406.pocketing.user.repository.UserLikedGroupRepository;
import com.a406.pocketing.user.repository.UserLikedMemberRepository;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
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

        return LoginResponseDto.ofExistingUser(user);
    }

    @Override
    @Transactional
    public void registerLikedInfo(Long userId, UserLikedInfoRequestDto likedInfoRequestDto) {
        // 관심 그룹 등록, 그룹 등록 로직 내에서 관심 멤버 등록 수행
        registerLikedGroup(userId, likedInfoRequestDto.getLikedGroupList());
    }

    @Override
    @Transactional
    public void registerLikedGroup(Long userId, List<LikedGroupDto> likedGroupList) {
        // 1. 로그인한 사용자의 엔티티 조회
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));

        // 2. 사용자의 현재 관심 그룹 ID 리스트
        List<Long> existingGroupIds = new ArrayList<>();
        if(user.getLikedGroups() != null) {
            existingGroupIds = user.getLikedGroups().stream()
                    .map(userLikedGroup -> userLikedGroup.getGroup().getGroupId())
                    .toList();
        }

        // 3. 관심 그룹으로 등록되지 않은 그룹만 필터링
        List<UserLikedGroup> toSave = new ArrayList<>();
        for(LikedGroupDto likedGroup : likedGroupList) {
            if(!existingGroupIds.contains(likedGroup.getGroupId())) {
                Group group = groupRepository.findByGroupId(likedGroup.getGroupId()).orElseThrow(() -> new BadRequestHandler(GROUP_NOT_FOUND));
                UserLikedGroup entity = UserLikedGroup.builder()
                        .user(user)
                        .group(group)
                        .build();

                toSave.add(entity);
            }

            registerLikedMember(user, likedGroup.getLikedMemberList());
        }

        // 4. 필터링된 그룹만 저장
        userLikedGroupRepository.saveAll(toSave);
    }

    @Override
    @Transactional
    public void registerLikedMember(User user, List<Long> likedMemberList) {
        // 1. 사용자의 현재 관심 멤버 ID 리스트
        List<Long> existingMemberIds = new ArrayList<>();
        if(user.getLikedMembers() != null) {
            existingMemberIds = user.getLikedMembers().stream()
                    .map(userLikedMember -> userLikedMember.getMember().getMemberId())
                    .toList();
        }

        // 2. 관심 멤버로 등록되지 않는 멤버만 필터링
        List<UserLikedMember> toSave = new ArrayList<>();
        for(Long likedMemberId : likedMemberList) {
            if(!existingMemberIds.contains(likedMemberId)) {
                Member member = memberRepository.findByMemberId(likedMemberId).orElseThrow(() -> new BadRequestHandler(MEMBER_NOT_FOUND));
                UserLikedMember entity = UserLikedMember.builder()
                        .user(user)
                        .member(member)
                        .build();

                toSave.add(entity);
            }
        }

        // 3. 필터링된 멤버만 저장
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

    @Override
    @Transactional
    public void deleteLikedGroup(Long userId, Long groupId) {
        // 1. 그룹 유효성 검사
        Group group = groupRepository.findByGroupId(groupId).orElseThrow(() -> new BadRequestHandler(GROUP_NOT_FOUND));

        // 2. 관심 그룹 여부 확인
        UserLikedGroup userLikedGroup = userLikedGroupRepository.findByUserUserIdAndGroup(userId, group)
                .orElseThrow(() -> new BadRequestHandler(USER_LIKE_GROUP_NOT_FOUND));

        // 3. 관심 멤버 일괄 삭제
        userLikedMemberRepository.deleteByUserIdAndGroup(userId, group);

        // 4. 관심 그룹 엔티티 조회 및 삭제
        userLikedGroupRepository.delete(userLikedGroup);
    }

    @Override
    @Transactional
    public void deleteLikedMember(Long userId, Long memberId) {
        // 1. 멤버 유효성 검사
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new BadRequestHandler(MEMBER_NOT_FOUND));
        
        // 2. 관심 멤버 여부 확인 및 삭제
        UserLikedMember userLikedMember = userLikedMemberRepository.findByUserUserIdAndMember(userId, member)
                .orElseThrow(() -> new BadRequestHandler(USER_LIKE_MEMBER_NOT_FOUND));
        userLikedMemberRepository.delete(userLikedMember);

        // 3. 사용자가 해당 그룹의 다른 멤버도 관심 등록했는지 확인
        Boolean hasOtherLikedMembers = userLikedMemberRepository.existsByUserUserIdAndMemberGroup(userId, member.getGroup());

        // 4. 없으면 해당 group도 관심 그룹에서 삭제
        if(!hasOtherLikedMembers) {
            userLikedGroupRepository.deleteByUserUserIdAndGroup(userId, member.getGroup());
        }
    }

    @Override
    public MyPageResponseDto getMyPageInfo(Long userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        return MyPageResponseDto.from(user);
    }

    @Override
    @Transactional
    public void updateMyPageInfo(Long userId, MyPageRequestDto myPageRequestDto) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new BadRequestHandler(USER_NOT_FOUND));
        user.updateUser(myPageRequestDto);
    }

}
