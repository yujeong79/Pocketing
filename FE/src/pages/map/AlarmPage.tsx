import { useCallback, useEffect, useState } from 'react';

import * as S from './AlarmStyle';
import Header from '@/components/common/Header';
import SmallButton from './components/buttons/SmallButton';
import { getNotification } from '@/api/notification/notification';
import { NotificationContent } from '@/types/notification';
import { acceptOrRejectPocketCall } from '@/api/exchange/pocketCall';

const AlarmPage = () => {
  const [notification, setNotification] = useState<NotificationContent[] | null>(null);

  const handleGetNotification = async () => {
    try {
      const response = await getNotification();
      setNotification(response.result.content);
      console.log(notification);
    } catch (error) {
      throw error;
    }
  };

  const handleAccept = useCallback(async (exchangeRequestId: number) => {
    try {
      const response = await acceptOrRejectPocketCall({
        exchangeRequestId: exchangeRequestId,
        accepted: true,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  }, []);

  const handleReject = useCallback(async (exchangeRequestId: number) => {
    try {
      const response = await acceptOrRejectPocketCall({
        exchangeRequestId: exchangeRequestId,
        accepted: false,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <>
      <Header type="alarm" title="교환 알림" />
      <S.AlarmPageContainer>
        {notification?.map((notification, notificationIndex) => (
          <S.AlarmItemContainer key={notificationIndex}>
            {notification.notificationType === 'REJECTED' ? <S.RejectedCover /> : null}
            <S.AlarmProfileImage src={notification.user.profileImageUrl} alt="윈터1" />
            <S.AlarmRightSection>
              <S.AlarmHeader>
                <S.AlarmName>{notification.user.nickname}</S.AlarmName>
                {notification.notificationType === 'ACCEPTED_ACTIVE' ? (
                  <S.AlarmTitle>님이 포켓콜을 보냈어요</S.AlarmTitle>
                ) : (
                  <S.AlarmTitle>님이 포켓콜을 수락했어요</S.AlarmTitle>
                )}
              </S.AlarmHeader>
              <S.AlarmButtonContainer>
                {notification.notificationType === 'ACCEPTED_ACTIVE' ? (
                  <SmallButton type="accept" text="채팅방으로 이동" onClick={() => {}} />
                ) : notification.notificationType === 'ACCEPTED_PASSIVE' ? (
                  <SmallButton type="accept" text="채팅방으로 이동" onClick={() => {}} />
                ) : (
                  <>
                    <SmallButton
                      type="accept"
                      text="수락"
                      onClick={() => handleAccept(notification.exchangeRequest.exchangeRequestId)}
                    />
                    <SmallButton
                      type="reject"
                      text="거절"
                      onClick={() => handleReject(notification.exchangeRequest.exchangeRequestId)}
                    />
                  </>
                )}
              </S.AlarmButtonContainer>
            </S.AlarmRightSection>
          </S.AlarmItemContainer>
        ))}
      </S.AlarmPageContainer>
    </>
  );
};

export default AlarmPage;
