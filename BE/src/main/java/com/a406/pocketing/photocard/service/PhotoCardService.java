package com.a406.pocketing.photocard.service;

import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.dto.PhotoCardPriceResponseDto;

public interface PhotoCardService {
    PhotoCardListResponse getPhotoCards(Long albumId, Long memberId);

    PhotoCardPriceResponseDto getPriceByCardId(Long cardId);

    void updatePrice(Long cardId, int newPrice);

    void decreasePrice(Long cardId, int deletedPrice);

}

