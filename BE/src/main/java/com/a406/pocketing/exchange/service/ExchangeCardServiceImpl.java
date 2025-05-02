package com.a406.pocketing.exchange.service;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.album.service.AlbumService;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResponseDto;
import com.a406.pocketing.exchange.dto.NearbyExchangeCardResult;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.UserLocation;
import com.a406.pocketing.exchange.entity.UserLocationHistory;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.exchange.repository.UserLocationRepository;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.member.service.MemberService;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        // 1. userId + isOwned + status = ACTIVE인 기존 카드 탐색
        ExchangeCard existingCard = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, isOwned);

        if(existingCard != null){
            // 2. 있으면 update
            existingCard.updateCardInfo(group, album, member, description, exchangeImageUrl);
        } else {
            // 3. 없으면 insert
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
                .group(group.getNameKo())
                .album(album.getTitle())
                .member(member.getName())
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

        // 1. 내 위치 조회
        UserLocation userLocation = userLocationRepository.findById(userId)
                .orElseThrow(() -> new GeneralException(EXCHANGE_LOCATION_NOT_FOUND));

        Point myLocation = userLocation.getLocation();

        // 2. 내 카드 조합 A-B 저장
        ExchangeCard wanted = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, false);
        ExchangeCard owned = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, true);

        if (owned == null || wanted == null) {
            throw new GeneralException(EXCHANGE_CARD_NOT_FOUND);
        }

        // 3. 범위 내 유저 + 카드 + 거리 조회
        List<NearbyExchangeCardResult> candidates =
                exchangeCardRepository.findNearbyExchangeCandidates(myLocation, userId, range);

        // 4. 매칭 결과 생성
        List<NearbyExchangeCardResponseDto> exactMatches = new ArrayList<>();
        List<NearbyExchangeCardResponseDto> supplement = new ArrayList<>();
        Set<Long> seenUserIds = new HashSet<>();

        for (NearbyExchangeCardResult res: candidates) {
            // 임시 코드
            Boolean isRequested = false;

            NearbyExchangeCardResponseDto dto = mapToDto(userId, res, isRequested);

            // 정확 매칭 : B-A인 사람들
            if (!res.isOwned()
                    && res.getAlbumId().equals(owned.getAlbum().getAlbumId())
                    && res.getMemberId().equals(owned.getMember().getMemberId())) {
                exactMatches.add(dto);
                seenUserIds.add(res.getUserId());
            }
            // 보완 매칭 : 상대가 내가 원하는 카드만 가짐
            else if (res.isOwned()
                    && res.getAlbumId().equals(wanted.getAlbum().getAlbumId())
                    && res.getMemberId().equals(wanted.getMember().getMemberId())
                    && !seenUserIds.contains(res.getUserId())) {
                supplement.add(dto);
            }

            if (exactMatches.size() >= 5 && supplement.size() >= 15) break;
        }

        exactMatches.addAll(supplement);
        return exactMatches;
    }

    private NearbyExchangeCardResponseDto mapToDto(Long myUserId, NearbyExchangeCardResult res, Boolean isRequested) {
        return NearbyExchangeCardResponseDto.builder()
                .userId(res.getUserId())
                .nickname(res.getNickname())
                .distance(res.getDistance())
                .card(NearbyExchangeCardResponseDto.CardDto.builder()
                        .cardId(res.getCardId())
                        .isOwned(res.isOwned())
                        .group(res.getGroup())
                        .album(res.getAlbum())
                        .member(res.getMember())
                        .content(res.getContent())
                        .imageUrl(res.getImageUrl())
                        .build())
                .isRequested(isRequested)
                .build();
    }
}
