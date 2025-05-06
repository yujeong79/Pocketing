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
import com.a406.pocketing.post.entity.Post;
import com.a406.pocketing.post.repository.PostRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
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

    @PersistenceContext
    private EntityManager entityManager;


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

        return new PhotoCardPriceResponseDto(
                stats.getMinPrice(),
                stats.getMaxPrice(),
                stats.getAvgPrice()
        );
    }


    //  등록 시: 판매글 가격 기준으로 통계 누적 갱신
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
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
                        .minPrice(newPrice)
                        .maxPrice(newPrice)
                        .lastUpdated(LocalDateTime.now())
                        .build());

        stats.setPostCount(stats.getPostCount() + 1);
        stats.setTotalPrice(stats.getTotalPrice() + newPrice);
        stats.setAvgPrice((int) (stats.getTotalPrice() / stats.getPostCount()));
        stats.setMinPrice(Math.min(stats.getMinPrice(), newPrice));
        stats.setMaxPrice(Math.max(stats.getMaxPrice(), newPrice));
        stats.setLastUpdated(LocalDateTime.now());

        photoCardStatisticsRepository.save(stats);

        log.info("[시세 누적 갱신] cardId={}, price={}, postCount={}, avg={}",
                cardId, newPrice, stats.getPostCount(), stats.getAvgPrice());
    }

    // 삭제 시: 해당 가격을 통계에서 제거하고 재계산
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void decreasePrice(Long cardId, int deletedPrice) {
        PhotoCardStatistics stats = photoCardStatisticsRepository.findById(cardId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.STATISTICS_NOT_FOUND));

        if (stats.getPostCount() <= 1) {
            // 마지막 글 삭제 → 초기화
            stats.setPostCount(0);
            stats.setTotalPrice(0L);
            stats.setAvgPrice(0);
            stats.setMinPrice(0);
            stats.setMaxPrice(0);
        } else {
            stats.setPostCount(stats.getPostCount() - 1);
            stats.setTotalPrice(stats.getTotalPrice() - deletedPrice);
            stats.setAvgPrice((int) (stats.getTotalPrice() / stats.getPostCount()));

            entityManager.flush();

            // ⚠️ min/max는 전체 post 조회로 재계산 (희소케이스라 비용 OK)
            // ⬇⬇ 여기를 아래처럼 고치세요
            List<Post> remainingPosts = postRepository.findAllByPhotoCard_CardId(cardId);

            if (remainingPosts.isEmpty()) {
                stats.setMinPrice(0);
                stats.setMaxPrice(0);
            } else if (remainingPosts.size() == 1) {
                int onlyPrice = remainingPosts.get(0).getPrice();
                stats.setMinPrice(onlyPrice);
                stats.setMaxPrice(onlyPrice);
            } else {
                stats.setMinPrice(remainingPosts.stream().mapToInt(Post::getPrice).min().orElse(0));
                stats.setMaxPrice(remainingPosts.stream().mapToInt(Post::getPrice).max().orElse(0));
            }
        }

        stats.setLastUpdated(LocalDateTime.now());
        photoCardStatisticsRepository.save(stats);

        log.info("[시세 감소 반영] cardId={}, priceRemoved={}, postCount={}",
                cardId, deletedPrice, stats.getPostCount());
    }
}




