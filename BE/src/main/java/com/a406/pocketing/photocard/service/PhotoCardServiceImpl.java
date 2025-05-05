package com.a406.pocketing.photocard.service;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.dto.PhotoCardSimpleDto;
import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.photocard.repository.PhotoCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoCardServiceImpl implements PhotoCardService {

    private final PhotoCardRepository photoCardRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;

    @Override
    public PhotoCardListResponse getPhotoCards(Long albumId, Long memberId) {
        if (albumId == null) {
            throw new GeneralException(ErrorStatus.ALBUM_ID_REQUIRED);
        }

        if (memberId == null) {
            throw new GeneralException(ErrorStatus.MEMBER_ID_REQUIRED);
        }

        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.ALBUM_NOT_FOUND));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.MEMBER_NOT_FOUND));

        List<PhotoCard> cards = photoCardRepository.findByAlbumAndMember(album, member);
        List<PhotoCardSimpleDto> result = cards.stream()
                .map(card -> new PhotoCardSimpleDto(card.getCardId(), card.getCardImageUrl()))
                .toList();

        return new PhotoCardListResponse(result);
    }
}
