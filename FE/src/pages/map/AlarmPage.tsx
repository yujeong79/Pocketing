import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './AlarmStyle';
import Header from '@/components/common/Header';
import SmallButton from './components/buttons/SmallButton';
import { getNotification } from '@/api/notification/notification';
import { NotificationContent } from '@/types/notification';
import { acceptOrRejectPocketCall } from '@/api/exchange/pocketCall';
import { useAuth } from '@/hooks/useAuth';
import { createOrGetChatRoom, enterChatRoom } from '@/api/chat';

const AlarmPage = () => {
  const [notification, setNotification] = useState<NotificationContent[] | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleChatButtonClick = async (user1Id: number, user2Id: number, exchangeId: number) => {
    try {
      const createResponse = await createOrGetChatRoom(user1Id, user2Id, undefined, exchangeId);
      console.log('채팅방 생성 응답:', createResponse);

      if (createResponse.isSuccess) {
        const roomId = createResponse.result.roomId;
        const enterResponse = await enterChatRoom(roomId);
        console.log('채팅방 입장 응답:', enterResponse);

        if (enterResponse.isSuccess) {
          navigate(`/message/${roomId}`, {
            state: {
              nickname:
                notification?.find((n) => n.exchangeRequest.exchangeRequestId === exchangeId)?.user
                  .nickname ?? '',
              chatType: 'EXCHANGE',
              chatRoomDetail: enterResponse.result,
            },
          });
        }
      }
    } catch (error) {
      console.error('채팅방 생성/입장 실패:', error);

      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
      return;
    }
  };

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
            <S.AlarmProfileImage src={notification.user.profileImageUrl} alt="프로필" />
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
                  <SmallButton
                    type="accept"
                    text="채팅방으로 이동"
                    onClick={() =>
                      handleChatButtonClick(
                        user?.userId ?? 0,
                        notification.user.userId,
                        notification.exchangeRequest.exchangeRequestId
                      )
                    }
                  />
                ) : notification.notificationType === 'ACCEPTED_PASSIVE' ? (
                  <SmallButton
                    type="accept"
                    text="채팅방으로 이동"
                    onClick={() =>
                      handleChatButtonClick(
                        user?.userId ?? 0,
                        notification.user.userId,
                        notification.exchangeRequest.exchangeRequestId
                      )
                    }
                  />
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
