package com.a406.pocketing.album.controller;

import com.a406.pocketing.album.dto.AlbumResponseDto;
import com.a406.pocketing.album.service.AlbumService;
import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping
    public ApiResponse<List<AlbumResponseDto>> getAlbums(@RequestParam(required = false) Long groupId) {
        List<AlbumResponseDto> albums = albumService.getAlbumsByGroupId(groupId);
        return ApiResponse.of(SuccessStatus.ALBUM_LIST_FETCH_SUCCESS, albums);
    }
}
