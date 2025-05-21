import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './AlarmStyle';
import Header from '@/components/common/Header';
import SmallButton from './components/buttons/SmallButton';
import { acceptOrRejectPocketCall } from '@/api/exchange/pocketCall';
import { useAuth } from '@/hooks/useAuth';
import { createOrGetChatRoom, enterChatRoom } from '@/api/chat';
import { useGlobalStore } from '@/store/globalStore';
import { useNotification, useNotificationRead } from '@/hooks/notification/useNotification';

const AlarmPage = () => {
  // const [notification, setNotification] = useState<NotificationContent[] | null>(null);
  const { user } = useAuth();
  const { notification, fetchNotification } = useNotification();
  const { readNotification } = useNotificationRead();
  const { isNotificationLoading, setIsNotificationLoading } = useGlobalStore();
  const navigate = useNavigate();

  const handleAccept = useCallback(async (exchangeRequestId: number) => {
    const response = await acceptOrRejectPocketCall({
      exchangeRequestId: exchangeRequestId,
      accepted: true,
    });
    setIsNotificationLoading(false);
    console.log(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReject = useCallback(async (exchangeRequestId: number) => {
    const response = await acceptOrRejectPocketCall({
      exchangeRequestId: exchangeRequestId,
      accepted: false,
    });
    setIsNotificationLoading(false);
    console.log(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const fetchData = async () => {
      if (!isNotificationLoading) {
        try {
          console.log('1. 첫 알림 조회');
          await fetchNotification();

          console.log('2. 읽음 처리');
          await readNotification();

          console.log('3. 알림 다시 조회');
          await fetchNotification();

          setIsNotificationLoading(true);
        } catch (error) {
          console.error('알림 처리 중 에러:', error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotificationLoading]);

  return (
    <>
      <Header type="alarm" title="교환 알림" />
      {notification?.length === 0 ? (
        <S.NonAlarmContainer>
          <S.NonAlarmText>알림이 없습니다.</S.NonAlarmText>
        </S.NonAlarmContainer>
      ) : (
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
      )}
    </>
  );
};

export default AlarmPage;
