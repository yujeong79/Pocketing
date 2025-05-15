package com.a406.pocketing.exchange.service;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResponseDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.UserLocation;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.exchange.repository.UserLocationRepository;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExchangeCardServiceImpl implements ExchangeCardService{

    private final ExchangeCardRepository exchangeCardRepository;
    private final GroupRepository groupRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final UserLocationRepository userLocationRepository;

    /**
     * 현장 교환 카드 등록 API
     * @param userId
     * @param requestDto
     * @return responseDto
     */
    @Override
    @Transactional
    public ExchangeCardResponseDto registerExchangeCard(Long userId, ExchangeCardRequestDto requestDto) {
        Boolean isOwned = requestDto.getIsOwned();
        Long groupId = requestDto.getGroupId();
        Long albumId = requestDto.getAlbumId();
        Long memberId = requestDto.getMemberId();
        String description = requestDto.getDescription();
        String exchangeImageUrl = requestDto.getExchangeImageUrl();

        // 객체 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GeneralException(GROUP_NOT_FOUND));
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new GeneralException(ALBUM_NOT_FOUND));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new GeneralException(MEMBER_NOT_FOUND));

        // 1. 동일 카드 중복 등록 방지
        Optional<ExchangeCard> duplicate = exchangeCardRepository
                .findDuplicateCard(
                        userId, albumId, memberId, isOwned,"ACTIVE"
                );
        if (duplicate.isPresent()) {
            throw new GeneralException(EXCHANGE_CARD_EXISTS);
        }

        // 2. userId + isOwned + status = ACTIVE인 기존 카드 탐색
        ExchangeCard existingCard = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, isOwned)
                .orElseThrow(() -> {
                    if (isOwned) return new GeneralException(EXCHANGE_OWNED_CARD_NOT_FOUND);
                    else return new GeneralException(EXCHANGE_WANTED_CARD_NOT_FOUND);
                });

        if(existingCard != null){
            // 3. 있으면 update
            existingCard.updateCardInfo(group, album, member, description, exchangeImageUrl);
        } else {
            // 4. 없으면 insert
            ExchangeCard newCard = ExchangeCard.builder()
                    .user(user)
                    .group(group)
                    .album(album)
                    .member(member)
                    .isOwned(isOwned)
                    .description(description)
                    .exchangeImageUrl(exchangeImageUrl)
                    .status("ACTIVE")
                    .build();
            exchangeCardRepository.save(newCard);
            existingCard = newCard;
        }

        // 4. 응답 DTO 구성
        return ExchangeCardResponseDto.builder()
                .exchangeCardId(existingCard.getExchangeCardId())
                .isOwned(isOwned)
                .group(group.getDisplayName())
                .album(album.getTitle())
                .member(member.getName())
                .build();
    }

    /**
     * 희망카드/보유카드 조회 API
     * @param userId
     * @param isOwned
     * @return
     */
    @Override
    public ExchangeCardResponseDto getExchangeCard(Long userId, Boolean isOwned) {
        ExchangeCard exchangeCard = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, isOwned)
                .orElseThrow(() -> {
                    if (isOwned) return new GeneralException(EXCHANGE_OWNED_CARD_NOT_FOUND);
                    else return new GeneralException(EXCHANGE_WANTED_CARD_NOT_FOUND);
                });

        return ExchangeCardResponseDto.builder()
                .exchangeCardId(exchangeCard.getExchangeCardId())
                .isOwned(isOwned)
                .group(exchangeCard.getGroup().getDisplayName())
                .album(exchangeCard.getAlbum().getTitle())
                .member(exchangeCard.getMember().getName())
                .build();
    }

    /**
     * 현장 교환 목록 조회 API
     * @param userId
     * @param range
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public List<NearbyExchangeCardResponseDto> getNearbyExchangeList(Long userId, Integer range) {

        log.info("[현장 교환 목록 조회] userId={}, range={}", userId, range);

        // 1. 내 위치 조회
        UserLocation userLocation = userLocationRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(EXCHANGE_LOCATION_NOT_FOUND));
        Point myLocation = userLocation.getLocation();

        // 2. 내 카드 조합 A-B 저장
        ExchangeCard wanted = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, false)
                .orElseThrow(() -> new GeneralException(EXCHANGE_WANTED_CARD_NOT_FOUND));
        ExchangeCard owned = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, true)
                        .orElseThrow(() -> new GeneralException(EXCHANGE_OWNED_CARD_NOT_FOUND));
        log.info(wanted.getMember().getName());
        log.info("wantedId = {}", wanted.getMember().getMemberId());

        if (owned == null || wanted == null) {
            throw new GeneralException(EXCHANGE_CARD_NOT_FOUND);
        }

        log.info("[쿼리 파라미터]");
        log.info("userId             = {}", userId);
        log.info("myLocation         = {}", myLocation);
        log.info("range              = {}", range);
        log.info("myWantedAlbumId    = {}", wanted.getAlbum().getAlbumId());
        log.info("myWantedMemberId   = {}", wanted.getMember().getMemberId());
        log.info("myOwnedAlbumId     = {}", owned.getAlbum().getAlbumId());
        log.info("myOwnedMemberId    = {}", owned.getMember().getMemberId());


        // 3. 내가 원하는 카드를 가진 사람 목록 조회
        List<Object[]> rawCandidates = exchangeCardRepository.findNearbyExchangeCardsWithMatchType(
                userId,
                myLocation,
                wanted.getAlbum().getAlbumId(),
                wanted.getMember().getMemberId(),
                owned.getExchangeCardId(),
                owned.getAlbum().getAlbumId(),
                owned.getMember().getMemberId(),
                range.doubleValue()
        );

        log.info("쿼리 결과 개수: {}", rawCandidates.size());

        // 4. 결과 매핑 및 정확 매핑 여부 판별
        return rawCandidates.stream()
                .map(NearbyExchangeCardResponseDto::fromNativeResult)
                .toList();
    }

}
