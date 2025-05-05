package com.a406.pocketing.photocard.service;

import com.a406.pocketing.photocard.dto.PhotoCardListResponse;

public interface PhotoCardService {
    PhotoCardListResponse getPhotoCards(Long albumId, Long memberId);
}
