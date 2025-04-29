package com.a406.pocketing.group.service;

import com.a406.pocketing.group.dto.GroupResponseDto;

import java.util.List;

public interface GroupService {
    List<GroupResponseDto> getAllGroups(Long userId);
    List<GroupResponseDto> getLikedGroups(Long userId);
}
