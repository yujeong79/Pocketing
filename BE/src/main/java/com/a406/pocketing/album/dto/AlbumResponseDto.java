package com.a406.pocketing.album.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbumResponseDto {
    private Long albumId;
    private String title;
}
