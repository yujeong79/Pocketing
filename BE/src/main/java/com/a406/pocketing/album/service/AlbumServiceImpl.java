package com.a406.pocketing.album.service;

import com.a406.pocketing.album.dto.AlbumResponseDto;
import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    @Override
    public List<AlbumResponseDto> getAlbumsByGroupId(Long groupId) {
        if (groupId == null) {
            throw new GeneralException(ErrorStatus.GROUP_NAME_REQUIRED);
        }

        List<Album> albums = albumRepository.findByGroupId(groupId);

        if (albums.isEmpty()) {
            throw new GeneralException(ErrorStatus.ALBUM_NOT_FOUND);
        }

        return albums.stream()
                .map(album -> new AlbumResponseDto(album.getAlbumId(), album.getTitle()))
                .collect(Collectors.toList());
    }
}
