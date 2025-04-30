package com.a406.pocketing.exchange.service;

import com.a406.pocketing.album.entity.Album;
import com.a406.pocketing.album.repository.AlbumRepository;
import com.a406.pocketing.album.service.AlbumService;
import com.a406.pocketing.common.apiPayload.code.status.ErrorStatus;
import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeCardRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeCardResponseDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.group.entity.Group;
import com.a406.pocketing.group.repository.GroupRepository;
import com.a406.pocketing.member.entity.Member;
import com.a406.pocketing.member.repository.MemberRepository;
import com.a406.pocketing.member.service.MemberService;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
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
    private final UserRepository userRepository;
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
}
