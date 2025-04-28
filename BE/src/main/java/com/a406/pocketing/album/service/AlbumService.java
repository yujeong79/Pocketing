package com.a406.pocketing.album.service;

import com.a406.pocketing.album.dto.AlbumResponseDto;

import java.util.List;

public interface AlbumService {
    List<AlbumResponseDto> getAlbumsByGroupId(Long groupId);
}
