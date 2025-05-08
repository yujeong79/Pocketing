package com.a406.pocketing.exchange.service;

import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeRequestDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.exchange.repository.ExchangeRequestRepository;
import com.a406.pocketing.notification.service.NotificationService;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.a406.pocketing.common.apiPayload.code.status.ErrorStatus.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExchangeServiceImpl implements ExchangeService{

    private final UserRepository userRepository;
    private final ExchangeRequestRepository exchangeRequestRepository;
    private final ExchangeCardRepository exchangeCardRepository;
    private final NotificationService notificationService;

    @Transactional
    public void sendExchangeRequest(Long requesterId, ExchangeRequestDto requestDto) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        User responder = userRepository.findById(requestDto.getResponderId())
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        ExchangeCard requesterCard = exchangeCardRepository.findById(requestDto.getRequesterOwnedCardId())
                .orElseThrow(() -> new GeneralException(EXCHANGE_CARD_NOT_FOUND));
        ExchangeCard responderCard = exchangeCardRepository.findById(requestDto.getResponderOwnedCardId())
                .orElseThrow(() -> new GeneralException(EXCHANGE_CARD_NOT_FOUND));

        // 중복 요청 확인 로직
        Boolean check = exchangeRequestRepository.existsByRequesterAndResponderAndRequesterOwnedCardAndResponderOwnedCardAndStatus(
                requester, responder, requesterCard, responderCard, "PENDING"
        );
        if (check) {
            throw new GeneralException(EXCHANGE_DUPLICATE_REQUEST);
        }

        ExchangeRequest request = ExchangeRequest.builder()
                .requester(requester)
                .responder(responder)
                .requesterOwnedCard(requesterCard)
                .responderOwnedCard(responderCard)
                .status("PENDING")
                .build();
        exchangeRequestRepository.save(request);
    }
}
