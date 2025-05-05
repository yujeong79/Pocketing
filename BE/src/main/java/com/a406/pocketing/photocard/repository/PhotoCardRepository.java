package com.a406.pocketing.photocard.repository;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.photocard.entity.PhotoCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoCardRepository extends JpaRepository<PhotoCard, Long> {
    List<PhotoCard> findByAlbumAndMember(Album album, Member member);
}
