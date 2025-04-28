package com.a406.pocketing.album.repository;

import com.a406.pocketing.album.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByGroupId(Long groupId);
}
