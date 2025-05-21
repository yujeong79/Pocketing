package com.a406.pocketing.exchange.service;

import com.a406.pocketing.common.apiPayload.exception.GeneralException;
import com.a406.pocketing.exchange.dto.ExchangeDecisionRequestDto;
import com.a406.pocketing.exchange.dto.ExchangeRequestDto;
import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.exchange.enums.ExchangeRequestStatus;
import com.a406.pocketing.exchange.repository.ExchangeCardRepository;
import com.a406.pocketing.exchange.repository.ExchangeRequestRepository;
import com.a406.pocketing.notification.entity.Notification;
import com.a406.pocketing.notification.enums.NotificationType;
import com.a406.pocketing.notification.repository.NotificationRepository;
import com.a406.pocketing.notification.service.NotificationService;
import com.a406.pocketing.user.entity.User;
import com.a406.pocketing.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
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
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public void sendExchangeRequest(Long requesterId, ExchangeRequestDto requestDto) {
        log.info("요청 보내기 requesterId = {}", requesterId);
        if(requesterId.equals(requestDto.getResponderId())) {
            throw new GeneralException(EXCHANGE_NOTIFICATION_FETCH_ERROR);
        }

        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        User responder = userRepository.findById(requestDto.getResponderId())
                .orElseThrow(() -> new GeneralException(USER_NOT_FOUND));
        ExchangeCard requesterCard = exchangeCardRepository.findById(requestDto.getRequesterOwnedCardId())
                .orElseThrow(() -> new GeneralException(EXCHANGE_OWNED_CARD_NOT_FOUND));
        ExchangeCard responderCard = exchangeCardRepository.findById(requestDto.getResponderOwnedCardId())
                .orElseThrow(() -> new GeneralException(EXCHANGE_OWNED_CARD_NOT_FOUND));

        // 중복 요청 확인 로직
        if (exchangeRequestRepository.existsDuplicate(
                requester, responder, requesterCard, responderCard, ExchangeRequestStatus.PENDING)) {
            throw new GeneralException(EXCHANGE_DUPLICATE_REQUEST);
        }

        ExchangeRequest request = ExchangeRequest.builder()
                .requester(requester)
                .responder(responder)
                .requesterOwnedCard(requesterCard)
                .responderOwnedCard(responderCard)
                .status(ExchangeRequestStatus.PENDING)
                .build();
        exchangeRequestRepository.save(request);

        // fcm 전송
        notificationService.sendFcmToUser(
                responder.getUserId(),
                "포켓콜 도착!",
                requester.getNickname() + "님이 포켓콜을 보냈어요"
        );
        // notification 테이블에 저장
        notificationService.createNotification(requester, responder, request, NotificationType.RECEIVED);
    }

    @Override
    @Transactional
    public void respondToExchange(Long userId, ExchangeDecisionRequestDto requestDto) {
        Long exchangeRequestId = requestDto.getExchangeRequestId();
        Boolean accepted = requestDto.getAccepted();
        ExchangeRequest exchangeRequest = exchangeRequestRepository.findByExchangeRequestId(exchangeRequestId)
                .orElseThrow(() -> new GeneralException(EXCHANGE_REQUEST_NOT_FOUND));

        // 응답 권한 인증
        if(! exchangeRequest.getResponder().getUserId().equals(userId)) {
            throw new GeneralException(EXCHANGE_REQUEST_USER_BAD_REQUEST);
        }

        // 이미 응답한 요청이면 예외
        if (exchangeRequest.getStatus() != ExchangeRequestStatus.PENDING) {
            throw new GeneralException(EXCHANGE_ALREADY_PROCESSED);
        }

        // 상태 업데이트
        exchangeRequest.updateStatus(requestDto.getAccepted() ? ExchangeRequestStatus.ACCEPTED : ExchangeRequestStatus.REJECTED);
        User requester = exchangeRequest.getRequester();
        User responder = exchangeRequest.getResponder();

        if (requestDto.getAccepted()) {
            ExchangeCard requesterOwned = exchangeRequest.getRequesterOwnedCard();
            ExchangeCard responderOwned = exchangeRequest.getResponderOwnedCard();
            requesterOwned.updateStatus("EXCHANGED");
            responderOwned.updateStatus("EXCHANGED");

            ExchangeCard requesterWanted = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(requester.getUserId(), false)
                    .orElseThrow(() -> new GeneralException(EXCHANGE_WANTED_CARD_NOT_FOUND));
            ExchangeCard responderWanted = exchangeCardRepository.findActiveCardByUserIdAndIsOwned(responder.getUserId(), false)
                    .orElseThrow(() -> new GeneralException(EXCHANGE_WANTED_CARD_NOT_FOUND));
            requesterWanted.updateStatus("EXCHANGED");
            responderWanted.updateStatus("EXCHANGED");
        }


        // 기존 RECEIVED 알림 가져오기
        Notification receivedNotification  = notificationRepository
                .findByExchangeRequestAndNotificationType(exchangeRequest, NotificationType.RECEIVED)
                        .orElseThrow(() -> new GeneralException(NOTIFICATION_NOT_FOUND));

        // RECEIVE 알림 -> ACCEPTED_ACTIVE로 상태 업데이트
        receivedNotification.updateStatus(accepted ? NotificationType.ACCEPTED_ACTIVE : NotificationType.REJECTED);

        // fcm 알림 전송
        notificationService.sendFcmToUser(
                requester.getUserId(),
                "포켓콜 응답 도착!",
                responder.getNickname() + "님이 포켓콜을 " + (requestDto.getAccepted() ? "수락" : "거절") + "했어요"
        );

        // 응답 알림 생성 (항상 새로 생성)
        if (accepted) {
            notificationService.createNotification(
                    responder, requester, exchangeRequest, NotificationType.ACCEPTED_PASSIVE
            );
        } else {
            // 거절 시: 중복 방지
            if (!notificationRepository.existsByExchangeRequestAndNotificationType(exchangeRequest, NotificationType.RECEIVED)) {
                notificationService.createNotification(
                        responder, requester, exchangeRequest, NotificationType.REJECTED
                );
            }
        }
    }
}
