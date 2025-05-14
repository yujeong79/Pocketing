import { messaging } from './firebase';
import { getToken, onMessage } from 'firebase/messaging';
import axiosInstance from './api/auth/axiosInstance';
import { useChatStore } from './store/chatStore';

export const requestFcmToken = async () => {
  // 먼저 푸시 지원 여부 확인
  if (!isPushSupported()) {
    console.warn('❌ 이 브라우저는 푸시 알림을 지원하지 않습니다.');
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('알림 권한 거부');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey:
        'BIULqTtkq1GzlTHMjOzncSv_GsJJE36fuyKGR0pCSDNQtLuk2fIiUxObTvw0uN9_AENBNAKhZ_DFrMVuNzZ5B_A',
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log('✅FCM 토큰:', token);
      //백엔드 전송
      await axiosInstance.post('/notification/fcm-token', {
        fcmToken: token,
      });
    }
    return token;
  } catch (err) {
    console.error('❌ FCM 토큰 요청 실패:', err);
    return null;
  }
};

export const initForegroundMessageListener = () => {
  onMessage(messaging, async (payload) => {
    console.log('📩 포그라운드 알림 수신:', payload);

    // 메시지 구조
    const title = payload.data?.title ?? payload.notification?.title ?? '알림';
    const body = payload.data?.body ?? payload.notification?.body ?? '';
    const type = payload.data?.type;
    const roomId = payload.data?.roomId;

    /* 같은 채팅방이면 무시 */
    const currentRoomId = useChatStore.getState().roomId;
    if (type === 'CHAT' && currentRoomId !== null && Number(roomId) === currentRoomId) return;

    if (document.visibilityState === 'visible') {
      /* 창이 보이는 중 -> Toast 등 커스텀 UI */
      new Notification(title, {
        body,
        icon: '/pocketing.svg',
        data: { type, roomId },
      });
    }
  });
};

/* 3. 유틸: 푸시 지원 여부 */
export const isPushSupported = (): boolean =>
  'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
