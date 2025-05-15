package com.a406.pocketing.photocard.controller;

import java.util.List;

import com.a406.pocketing.common.apiPayload.ApiResponse;
import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.dto.PhotoCardPriceResponseDto;
import com.a406.pocketing.photocard.dto.PhotoCardVectorDto;
import com.a406.pocketing.photocard.service.PhotoCardService;
import com.a406.pocketing.common.apiPayload.code.status.SuccessStatus;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
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

    @GetMapping("/price")
    public ApiResponse<PhotoCardPriceResponseDto> getPrice(@RequestParam Long cardId) {
        return ApiResponse.of(SuccessStatus.PRICE_FETCH_SUCCESS,
                photoCardService.getPriceByCardId(cardId));
    }

    @GetMapping("/without-embeddings")
    public ApiResponse<List<PhotoCardVectorDto>> getPhotoCardsUnembedded(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "100") int size) {

        log.info("컨트롤러 진입 성공, getPhotoCardsUnembedding...");

        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.of(SuccessStatus.PHOTOCARD_VECTOR_FETCH_SUCCESS,
            photoCardService.getPhotoCardsUnembedded(pageable));
    }

    @PostMapping("/{cardId}/embedding-status")
    public ApiResponse<Void> updateEmbeddingStatus(@PathVariable Long cardId) {
        photoCardService.updateEmbeddingStatus(cardId, true);
        return ApiResponse.of(SuccessStatus.EMBEDDING_UPDATE_SUCCESS, null);
    }

    @GetMapping("/group/{groupName}")
    public ApiResponse<Page<PhotoCardVectorDto>> getPhotoCardByGroup(
        @PathVariable String groupName,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.of(SuccessStatus.PHOTOCARD_SEARCH_SUCCESS,
            photoCardService.getPhotoCardByGroup(groupName, pageable));
    }

    @GetMapping("/recent")
    public ApiResponse<List<PhotoCardVectorDto>> getRecentPhotoCards(
        @RequestParam(defaultValue = "7") int days,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.of(SuccessStatus.PHOTOCARD_VECTOR_FETCH_SUCCESS,
            photoCardService.getRecentPhotoCards(days, pageable));
    }

    @GetMapping("/{cardId}")
    public ApiResponse<PhotoCardVectorDto> getPhotoCard(@PathVariable Long cardId) {
        return ApiResponse.of(SuccessStatus.PHOTOCARD_VECTOR_FETCH_SUCCESS,
            photoCardService.getPhotoCard(cardId));
    }
}
