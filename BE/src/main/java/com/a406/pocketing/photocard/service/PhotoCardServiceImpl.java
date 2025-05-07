package com.a406.pocketing.photocard.service;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.photocard.dto.PhotoCardListResponse;
import com.a406.pocketing.photocard.dto.PhotoCardPriceResponseDto;
import com.a406.pocketing.photocard.dto.PhotoCardSimpleDto;
import com.a406.pocketing.photocard.entity.PhotoCard;
import com.a406.pocketing.photocard.entity.PhotoCardStatistics;
import com.a406.pocketing.photocard.repository.PhotoCardRepository;
import com.a406.pocketing.photocard.repository.PhotoCardStatisticsRepository;
import com.a406.pocketing.post.repository.PostRepository;
import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhotoCardServiceImpl implements PhotoCardService {

    private final PhotoCardRepository photoCardRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final PhotoCardStatisticsRepository photoCardStatisticsRepository;
    private final PostRepository postRepository;

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

    @Override
    @Transactional(readOnly = true)
    public PhotoCardPriceResponseDto getPriceByCardId(Long cardId) {
        if (cardId == null) {
            throw new GeneralException(ErrorStatus.CARD_ID_REQUIRED);
        }

        PhotoCardStatistics stats = photoCardStatisticsRepository.findById(cardId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.STATISTICS_NOT_FOUND));

        // null 체크 추가
        if (stats.getMinPrice() == null || stats.getMaxPrice() == null) {
            throw new GeneralException(ErrorStatus.STATISTICS_NOT_FOUND);
        }

        return new PhotoCardPriceResponseDto(
                stats.getMinPrice(),
                stats.getMaxPrice(),
                stats.getAvgPrice()
        );
    }

    // 등록 시 시세 누적
    @Override
    @Transactional
    @Retryable(
            value = OptimisticLockException.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 100, multiplier = 2)
    )
    public void updatePrice(Long cardId, int newPrice) {
        PhotoCard photoCard = photoCardRepository.findById(cardId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.PHOTOCARD_NOT_FOUND));

        PhotoCardStatistics stats = photoCardStatisticsRepository.findById(cardId)
                .orElse(PhotoCardStatistics.builder()
                        .cardId(cardId)
                        .photoCard(photoCard)
                        .postCount(0)
                        .totalPrice(0L)
                        .avgPrice(0)
                        .minPrice(null)
                        .maxPrice(null)
                        .lastUpdated(LocalDateTime.now())
                        .build());

        stats.setPostCount(stats.getPostCount() + 1);
        stats.setTotalPrice(stats.getTotalPrice() + newPrice);
        stats.setAvgPrice((int) (stats.getTotalPrice() / stats.getPostCount()));

        // null이면 첫 값이므로 초기화
        stats.setMinPrice(stats.getMinPrice() == null ? newPrice : Math.min(stats.getMinPrice(), newPrice));
        stats.setMaxPrice(stats.getMaxPrice() == null ? newPrice : Math.max(stats.getMaxPrice(), newPrice));

        stats.setLastUpdated(LocalDateTime.now());

        photoCardStatisticsRepository.save(stats);

        log.info("[시세 누적 갱신] cardId={}, price={}, postCount={}, avg={}",
                cardId, newPrice, stats.getPostCount(), stats.getAvgPrice());
    }

    // 삭제 시 시세 감소 반영
    @Override
    @Transactional
    @Retryable(
            value = OptimisticLockException.class,
            maxAttempts = 3,
            backoff = @Backoff(delay = 100, multiplier = 2)
    )
    public void decreasePrice(Long cardId, int deletedPrice) {
        PhotoCardStatistics stats = photoCardStatisticsRepository.findById(cardId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.STATISTICS_NOT_FOUND));

        int newPostCount = stats.getPostCount() - 1;
        long newTotalPrice = stats.getTotalPrice() - deletedPrice;

        if (newPostCount <= 0) {
            stats.setPostCount(0);
            stats.setTotalPrice(0L);
            stats.setAvgPrice(0);
            stats.setMinPrice(null);
            stats.setMaxPrice(null);
        } else {
            stats.setPostCount(newPostCount);
            stats.setTotalPrice(newTotalPrice);
            stats.setAvgPrice((int) (newTotalPrice / newPostCount));

            // min/max 재계산
            // 개선된 코드
            if (deletedPrice == stats.getMinPrice()) {
                // 삭제된 가격이 최소가격인 경우에만 새로운 최소값 조회
                Integer newMinPrice = postRepository.findMinPriceByPhotoCardId(cardId);
                stats.setMinPrice(newMinPrice != null ? newMinPrice : 0);
            } else if (deletedPrice == stats.getMaxPrice()) {
                // 삭제된 가격이 최대가격인 경우에만 새로운 최대값 조회
                Integer newMaxPrice = postRepository.findMaxPriceByPhotoCardId(cardId);
                stats.setMaxPrice(newMaxPrice != null ? newMaxPrice : 0);
            }
        }

        stats.setLastUpdated(LocalDateTime.now());
        photoCardStatisticsRepository.save(stats);

        log.info("[시세 감소 반영] cardId={}, priceRemoved={}, postCount={}",
                cardId, deletedPrice, stats.getPostCount());
    }

    // 삭제 시 최대 재시도 후 실패 시 호출되는 메서드
    @Recover
    public void recoverDecreasePrice(OptimisticLockException e, Long cardId, int deletedPrice) {
        log.error("[시세 감소 반영 실패] 최대 재시도 초과: cardId={}, price={}, 오류={}",
                cardId, deletedPrice, e.getMessage());
        throw new GeneralException(ErrorStatus.CONCURRENT_UPDATE_FAILED);
    }

}




