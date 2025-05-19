package com.a406.pocketing.exchange.repository;

import com.a406.pocketing.exchange.entity.ExchangeCard;
import com.a406.pocketing.exchange.entity.ExchangeRequest;
import com.a406.pocketing.exchange.enums.ExchangeRequestStatus;
import com.a406.pocketing.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    Optional<ExchangeRequest> findByExchangeRequestId(Long exchangeRequestId);

    Boolean existsByRequesterAndResponderAndRequesterOwnedCardAndResponderOwnedCardAndStatus(
            User requester, User responder,
            ExchangeCard requesterCard, ExchangeCard responderCard,
            ExchangeRequestStatus status
    );

    @Query("""
            select  count(er) > 0
            from ExchangeRequest er 
            where er.status = :status
                and (
                    (er.requester = :requester
                    and er.responder = :responder
                    and er.requesterOwnedCard = :requesterCard
                    and er.responderOwnedCard = :responderCard)
                or (er.requester = :responder
                    and er.responder = :requester
                    and er.requesterOwnedCard = :responderCard
                    and er.responderOwnedCard = :requesterCard)    
                )
            """)
    Boolean existsDuplicate(@Param("requester") User requester,
                            @Param("responder") User responder,
                            @Param("requesterCard") ExchangeCard requesterCard,
                            @Param("responderCard") ExchangeCard responderCard,
                            @Param("status") ExchangeRequestStatus status);
}
