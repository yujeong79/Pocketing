package com.a406.pocketing.photocard.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.dto.PhotoCardPriceResponseDto;
import com.a406.pocketing.photocard.dto.PhotoCardVectorDto;

public interface PhotoCardService {
    PhotoCardListResponse getPhotoCards(Long albumId, Long memberId);

    PhotoCardPriceResponseDto getPriceByCardId(Long cardId);

    void updatePrice(Long cardId, int newPrice);

    void decreasePrice(Long cardId, int deletedPrice);

    List<PhotoCardVectorDto> getPhotoCardsUnembedded(Pageable pageable);

    void updateEmbeddingStatus(Long cardId, Boolean hasEmbedding);

    Page<PhotoCardVectorDto> getPhotoCardByGroup(String groupName, Pageable pageable);

    List<PhotoCardVectorDto> getRecentPhotoCards(int days, Pageable pageable);

    PhotoCardVectorDto getPhotoCard(Long cardId);
}

