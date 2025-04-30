package com.a406.pocketing.group.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.group.dto.GroupResponseDto;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    /**
     * 그룹 전체 조회 (관심 여부 포함)
     */
    @Override
    public List<GroupResponseDto> getAllGroups(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GeneralException(ErrorStatus.USER_NOT_FOUND));

        // 전체 그룹 조회
        List<Group> groups = groupRepository.findAll();

        // 좋아요 누른 그룹 ID를 Set으로 변환
        List<Long> likedGroupIds = user.getLikedGroups().stream()
                .map(userLikedGroup -> userLikedGroup.getGroup().getGroupId())
                .toList();

        // 그룹 목록을 DTO로 변환하면서 isInterest 추가
        return groups.stream()
                .map(group -> GroupResponseDto.builder()
                        .groupId(group.getGroupId())
                        .groupNameKo(group.getNameKo())
                        .groupNameEn(group.getNameEn())
                        .groupImageUrl(group.getGroupImageUrl())
                        .isInterest(likedGroupIds.contains(group.getGroupId()))
                        .build())
                .collect(Collectors.toList());
    }

}
