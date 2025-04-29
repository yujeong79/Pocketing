package com.a406.pocketing.exchange.service;

import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.album.service.AlbumService;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExchangeCardServiceImpl implements ExchangeCardService{

    private final ExchangeCardRepository exchangeCardRepository;
    private final GroupRepository groupRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final AlbumService albumService;
    private final MemberService memberService;

    /**
     * 현장 교환 카드 등록 API
     * @param userId
     * @param requestDto
     * @return
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

        // 1. userId + isOwned + status = ACTIVE인 기존 카드 탐색
        ExchangeCard existingCard = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(userId, isOwned);

        if(existingCard != null){
            // 2. 있으면 update
            exchangeCardRepository.updateCardInfo(
                    existingCard.getExchangeCardId(),
                    groupId,
                    albumId,
                    memberId,
                    description,
                    exchangeImageUrl
            );
        } else {
            // 3. 없으면 insert
            ExchangeCard newCard = ExchangeCard.builder()
                    .userId(userId)
                    .groupId(groupId)
                    .albumId(albumId)
                    .memberId(memberId)
                    .isOwned(isOwned)
                    .description(description)
                    .exchangeImageUrl(exchangeImageUrl)
                    .status("ACTIVE")
                    .build();
            exchangeCardRepository.save(newCard);
            existingCard = newCard;
        }

       // group 이름
       String groupName = groupRepository.findById(groupId)
               .orElseThrow(() -> new GeneralException(GROUP_NOT_FOUND))
               .getNameKo();

       // album 이름
       String albumName = albumRepository.findById(albumId)
               .orElseThrow(() -> new GeneralException(ALBUM_NOT_FOUND))
               .getTitle();

        // member 이름
        String memberName = memberRepository.findById(memberId)
                .orElseThrow(()-> new GeneralException(MEMBER_NOT_FOUND))
                .getName();

        // 4. 응답 DTO 구성
        return ExchangeCardResponseDto.builder()
                .exchangeCardId(existingCard.getExchangeCardId())
                .isOwned(isOwned)
                .group(groupName)
                .album(albumName)
                .member(memberName)
                .build();
    }
}
