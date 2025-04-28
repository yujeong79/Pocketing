package com.a406.pocketing.group.service;

import com.a406.pocketing.group.dto.GroupResponseDto;
import com.a406.pocketing.group.dto.GroupLikeResponseDto;

import java.util.List;

public interface GroupService {
    List<GroupResponseDto> getAllGroups(Long userId, String searchKeyword);
    GroupLikeResponseDto getLikedGroups(Long userId);
}
