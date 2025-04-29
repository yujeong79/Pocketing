package com.a406.pocketing.group.service;

import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.group.dto.GroupLikeResponseDto;
import com.a406.pocketing.group.dto.GroupResponseDto;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.entity.UserLikedGroup;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.group.repository.UserLikedGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserLikedGroupRepository userLikedGroupRepository;

    /**
     * 그룹 전체 조회
     * @param userId 사용자 ID
     * @return 그룹 리스트 (관심 그룹 여부 포함)
     */
    @Override
    public List<GroupResponseDto> getAllGroups(Long userId, String searchKeyword) {
        // 전체 그룹 조회
        List<Group> groups = groupRepository.findAll();

        // 사용자가 좋아요 누른 그룹 조회
        List<UserLikedGroup> likedGroups = userLikedGroupRepository.findByUserId(userId);

        // 좋아요 누른 그룹 ID를 Set으로 변환
        Set<Long> likedGroupIds = likedGroups.stream()
                .map(UserLikedGroup::getGroupId)
                .collect(Collectors.toSet());

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

    /**
     * 관심 그룹 리스트 조회
     * @param userId 사용자 ID
     * @return 관심 그룹 리스트
     */
    @Override
    public GroupLikeResponseDto getLikedGroups(Long userId) {
        // 사용자가 관심 등록한 그룹 조회
        List<UserLikedGroup> likedGroups = userLikedGroupRepository.findByUserId(userId);

        // 관심 그룹이 하나도 없으면 예외 발생
        if (likedGroups.isEmpty()) {
            throw new GeneralException(ErrorStatus.GROUP_NOT_FOUND);
        }

        // 관심 그룹 ID 리스트
        List<Long> likedGroupIds = likedGroups.stream()
                .map(UserLikedGroup::getGroupId)
                .toList();

        // 관심 그룹 ID들로 그룹 정보 한 번에 조회
        List<Group> groups = groupRepository.findAllById(likedGroupIds);

        // 그룹 목록을 DTO로 변환
        List<GroupLikeResponseDto.GroupSimpleDto> groupDtos = groups.stream()
                .map(group -> GroupLikeResponseDto.GroupSimpleDto.builder()
                        .groupId(group.getGroupId())
                        .groupNameKo(group.getNameKo())
                        .groupNameEn(group.getNameEn())
                        .groupImageUrl(group.getGroupImageUrl())
                        .build())
                .toList();

        return GroupLikeResponseDto.builder()
                .groups(groupDtos)
                .build();
    }
}
