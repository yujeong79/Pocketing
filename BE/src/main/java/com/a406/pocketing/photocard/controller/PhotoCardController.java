package com.a406.pocketing.photocard.controller;

import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.service.PhotoCardService;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/photocards")
public class PhotoCardController {

    private final PhotoCardService photoCardService;

    @GetMapping
    public ApiResponse<PhotoCardListResponse> getPhotoCards(
            @RequestParam(required = false) Long albumId,
            @RequestParam(required = false) Long memberId
    ) {
        return ApiResponse.of(SuccessStatus.PHOTOCARD_LIST_FETCH_SUCCESS,
                photoCardService.getPhotoCards(albumId, memberId));
    }
}
